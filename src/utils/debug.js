// Debug utility for portfolio site
export class DebugLogger {
  constructor(component = 'App') {
    this.component = component;
    this.startTime = performance.now();
    this.logs = [];
  }

  log(message, data = null) {
    const timestamp = performance.now() - this.startTime;
    const logEntry = {
      component: this.component,
      message,
      data,
      timestamp: timestamp.toFixed(2) + 'ms',
      time: new Date().toISOString()
    };
    
    this.logs.push(logEntry);
    console.log(`[${this.component}] ${message}`, data || '');
    
    return logEntry;
  }

  error(message, error = null) {
    const timestamp = performance.now() - this.startTime;
    const errorEntry = {
      component: this.component,
      message,
      error: error?.message || error,
      stack: error?.stack,
      timestamp: timestamp.toFixed(2) + 'ms',
      time: new Date().toISOString()
    };
    
    this.logs.push(errorEntry);
    console.error(`[${this.component}] ERROR: ${message}`, error || '');
    
    return errorEntry;
  }

  performance(label, fn) {
    const start = performance.now();
    this.log(`Starting ${label}`);
    
    try {
      const result = fn();
      const end = performance.now();
      this.log(`Completed ${label}`, `${(end - start).toFixed(2)}ms`);
      return result;
    } catch (error) {
      const end = performance.now();
      this.error(`Failed ${label} after ${(end - start).toFixed(2)}ms`, error);
      throw error;
    }
  }

  async performanceAsync(label, fn) {
    const start = performance.now();
    this.log(`Starting ${label}`);
    
    try {
      const result = await fn();
      const end = performance.now();
      this.log(`Completed ${label}`, `${(end - start).toFixed(2)}ms`);
      return result;
    } catch (error) {
      const end = performance.now();
      this.error(`Failed ${label} after ${(end - start).toFixed(2)}ms`, error);
      throw error;
    }
  }

  getLogs() {
    return this.logs;
  }

  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }
}

// WebGL debugging utilities
export const WebGLDebug = {
  checkSupport() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    
    if (!gl) {
      return {
        supported: false,
        error: 'WebGL not supported'
      };
    }

    return {
      supported: true,
      version: gl.getParameter(gl.VERSION),
      vendor: gl.getParameter(gl.VENDOR),
      renderer: gl.getParameter(gl.RENDERER),
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS)
    };
  },

  checkShaderCompilation(gl, shader, source, type) {
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(shader);
      console.error(`Shader compilation failed (${type}):`, error);
      console.error('Shader source:', source);
      return { success: false, error };
    }
    return { success: true };
  },

  checkProgramLinking(gl, program) {
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const error = gl.getProgramInfoLog(program);
      console.error('Program linking failed:', error);
      return { success: false, error };
    }
    return { success: true };
  }
};

// Performance monitoring
export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      renderTimes: [],
      frameTimes: [],
      memoryUsage: []
    };
    this.lastFrameTime = performance.now();
  }

  recordFrame() {
    const now = performance.now();
    const frameTime = now - this.lastFrameTime;
    this.frameTimes.push(frameTime);
    this.lastFrameTime = now;

    // Keep only last 60 frames
    if (this.frameTimes.length > 60) {
      this.frameTimes.shift();
    }

    // Record memory if available
    if (performance.memory) {
      this.memoryUsage.push({
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit,
        timestamp: now
      });

      if (this.memoryUsage.length > 60) {
        this.memoryUsage.shift();
      }
    }
  }

  getAverageFrameTime() {
    if (this.frameTimes.length === 0) return 0;
    return this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
  }

  getFPS() {
    const avgFrameTime = this.getAverageFrameTime();
    return avgFrameTime > 0 ? 1000 / avgFrameTime : 0;
  }

  getMetrics() {
    return {
      fps: this.getFPS(),
      avgFrameTime: this.getAverageFrameTime(),
      memoryUsage: this.memoryUsage[this.memoryUsage.length - 1] || null
    };
  }
}