import React, { useState, useEffect } from 'react';
import { DebugLogger, WebGLDebug } from '../utils/debug';

const DebugPanel = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState([]);
  const [webglInfo, setWebglInfo] = useState(null);
  const [systemInfo, setSystemInfo] = useState({});
  const [networkTests, setNetworkTests] = useState({});
  const [activeTab, setActiveTab] = useState('system');

  useEffect(() => {
    if (isOpen) {
      runDiagnostics();
    }
  }, [isOpen]);

  const runDiagnostics = async () => {
    const logger = new DebugLogger('DebugPanel');
    
    // System info
    const system = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      screen: {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      memory: performance.memory ? {
        used: (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(1) + 'MB',
        total: (performance.memory.totalJSHeapSize / 1024 / 1024).toFixed(1) + 'MB',
        limit: (performance.memory.jsHeapSizeLimit / 1024 / 1024).toFixed(1) + 'MB'
      } : 'Not available'
    };
    setSystemInfo(system);

    // WebGL info
    const webgl = WebGLDebug.checkSupport();
    setWebglInfo(webgl);

    // Network tests
    const networkResults = {};
    
    // Test server connection
    try {
      const serverResponse = await fetch('http://localhost:3001/api/health', {
        method: 'GET',
        timeout: 5000
      });
      networkResults.server = {
        status: serverResponse.ok ? 'Connected' : 'Error',
        statusCode: serverResponse.status,
        statusText: serverResponse.statusText
      };
    } catch (error) {
      networkResults.server = {
        status: 'Failed',
        error: error.message
      };
    }

    // Test static assets
    try {
      const assetTest = await fetch('/vite.svg');
      networkResults.assets = {
        status: assetTest.ok ? 'Loading' : 'Error',
        statusCode: assetTest.status
      };
    } catch (error) {
      networkResults.assets = {
        status: 'Failed',
        error: error.message
      };
    }

    setNetworkTests(networkResults);

    // Collect logs from localStorage if available
    try {
      const storedLogs = localStorage.getItem('debug-logs');
      if (storedLogs) {
        setLogs(JSON.parse(storedLogs));
      }
    } catch (error) {
      logger.error('Failed to load stored logs', error);
    }
  };

  const clearLogs = () => {
    setLogs([]);
    localStorage.removeItem('debug-logs');
  };

  const exportLogs = () => {
    const debugData = {
      timestamp: new Date().toISOString(),
      systemInfo,
      webglInfo,
      networkTests,
      logs
    };
    
    const blob = new Blob([JSON.stringify(debugData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debug-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Debug Panel</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="flex border-b">
          {['system', 'webgl', 'network', 'logs'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 capitalize ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-4 max-h-96 overflow-y-auto">
          {activeTab === 'system' && (
            <div className="space-y-4">
              <h3 className="font-semibold">System Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Platform:</strong> {systemInfo.platform}
                </div>
                <div>
                  <strong>Language:</strong> {systemInfo.language}
                </div>
                <div>
                  <strong>Online:</strong> {systemInfo.onLine ? 'Yes' : 'No'}
                </div>
                <div>
                  <strong>Cookies:</strong> {systemInfo.cookieEnabled ? 'Enabled' : 'Disabled'}
                </div>
                <div>
                  <strong>Screen:</strong> {systemInfo.screen?.width}x{systemInfo.screen?.height}
                </div>
                <div>
                  <strong>Viewport:</strong> {systemInfo.viewport?.width}x{systemInfo.viewport?.height}
                </div>
              </div>
              {systemInfo.memory && (
                <div>
                  <strong>Memory Usage:</strong>
                  <div className="text-sm mt-1">
                    Used: {systemInfo.memory.used} / Total: {systemInfo.memory.total}
                  </div>
                </div>
              )}
              <div>
                <strong>User Agent:</strong>
                <div className="text-xs mt-1 break-all">{systemInfo.userAgent}</div>
              </div>
            </div>
          )}

          {activeTab === 'webgl' && (
            <div className="space-y-4">
              <h3 className="font-semibold">WebGL Information</h3>
              {webglInfo ? (
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Supported:</strong> 
                    <span className={webglInfo.supported ? 'text-green-600' : 'text-red-600'}>
                      {webglInfo.supported ? ' Yes' : ' No'}
                    </span>
                  </div>
                  {webglInfo.supported ? (
                    <>
                      <div><strong>Version:</strong> {webglInfo.version}</div>
                      <div><strong>Vendor:</strong> {webglInfo.vendor}</div>
                      <div><strong>Renderer:</strong> {webglInfo.renderer}</div>
                      <div><strong>Max Texture Size:</strong> {webglInfo.maxTextureSize}</div>
                      <div><strong>Max Viewport:</strong> {webglInfo.maxViewportDims?.join('x')}</div>
                    </>
                  ) : (
                    <div className="text-red-600">
                      <strong>Error:</strong> {webglInfo.error}
                    </div>
                  )}
                </div>
              ) : (
                <div>Loading WebGL information...</div>
              )}
            </div>
          )}

          {activeTab === 'network' && (
            <div className="space-y-4">
              <h3 className="font-semibold">Network Tests</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Server Connection:</strong>
                  <span className={networkTests.server?.status === 'Connected' ? 'text-green-600' : 'text-red-600'}>
                    {' '}{networkTests.server?.status || 'Testing...'}
                  </span>
                  {networkTests.server?.error && (
                    <div className="text-red-600 text-xs mt-1">
                      Error: {networkTests.server.error}
                    </div>
                  )}
                </div>
                <div>
                  <strong>Static Assets:</strong>
                  <span className={networkTests.assets?.status === 'Loading' ? 'text-green-600' : 'text-red-600'}>
                    {' '}{networkTests.assets?.status || 'Testing...'}
                  </span>
                  {networkTests.assets?.error && (
                    <div className="text-red-600 text-xs mt-1">
                      Error: {networkTests.assets.error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Debug Logs</h3>
                <div className="space-x-2">
                  <button
                    onClick={clearLogs}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Clear
                  </button>
                  <button
                    onClick={exportLogs}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Export
                  </button>
                </div>
              </div>
              <div className="space-y-1 text-xs font-mono max-h-64 overflow-y-auto">
                {logs.length === 0 ? (
                  <div className="text-gray-500">No logs available</div>
                ) : (
                  logs.map((log, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded ${
                        log.error ? 'bg-red-50 text-red-800' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between">
                        <span className="font-semibold">[{log.component}]</span>
                        <span className="text-gray-500">{log.timestamp}</span>
                      </div>
                      <div>{log.message}</div>
                      {log.data && (
                        <div className="text-gray-600 mt-1">
                          {typeof log.data === 'string' ? log.data : JSON.stringify(log.data)}
                        </div>
                      )}
                      {log.error && (
                        <div className="text-red-600 mt-1">{log.error}</div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-4 bg-gray-50">
          <button
            onClick={runDiagnostics}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          >
            Refresh Diagnostics
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebugPanel;