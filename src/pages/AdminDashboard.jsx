import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ProjectsTab, AnnouncementsTab } from '../components/AdminComponents';
import { ProjectModal } from '../components/ProjectModal';
import { AnnouncementModal } from '../components/AnnouncementModal';

const AdminDashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const passkey = searchParams.get('passkey');

  useEffect(() => {
    if (!passkey) {
      navigate('/');
      return;
    }

    // Verify admin access
    verifyAdminAccess();
  }, [passkey, navigate]);

  const verifyAdminAccess = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/admin/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passkey': passkey
        }
      });

      if (response.ok) {
        setIsAuthenticated(true);
        fetchProjects();
        fetchAnnouncements();
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      navigate('/');
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/admin/announcements?passkey=${passkey}`);
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error('Failed to fetch announcements:', error);
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setShowProjectModal(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowProjectModal(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/admin/projects/${projectId}?passkey=${passkey}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchProjects();
      } else {
        alert('Failed to delete project');
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Failed to delete project');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAnnouncement = () => {
    setEditingAnnouncement(null);
    setShowAnnouncementModal(true);
  };

  const handleEditAnnouncement = (announcement) => {
    setEditingAnnouncement(announcement);
    setShowAnnouncementModal(true);
  };

  const handleDeleteAnnouncement = async (announcementId) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/admin/announcements/${announcementId}?passkey=${passkey}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchAnnouncements();
      } else {
        alert('Failed to delete announcement');
      }
    } catch (error) {
      console.error('Failed to delete announcement:', error);
      alert('Failed to delete announcement');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              Back to Site
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'projects'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'announcements'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Announcements
            </button>
          </nav>
        </div>

        {activeTab === 'projects' && (
          <ProjectsTab
            projects={projects}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            onAdd={handleAddProject}
            loading={loading}
          />
        )}

        {activeTab === 'announcements' && (
          <AnnouncementsTab
            announcements={announcements}
            onEdit={handleEditAnnouncement}
            onDelete={handleDeleteAnnouncement}
            onAdd={handleAddAnnouncement}
            loading={loading}
          />
        )}
      </div>

      {showProjectModal && (
        <ProjectModal
          project={editingProject}
          onClose={() => setShowProjectModal(false)}
          onSave={() => {
            setShowProjectModal(false);
            fetchProjects();
          }}
          passkey={passkey}
        />
      )}

      {showAnnouncementModal && (
        <AnnouncementModal
          announcement={editingAnnouncement}
          onClose={() => setShowAnnouncementModal(false)}
          onSave={() => {
            setShowAnnouncementModal(false);
            fetchAnnouncements();
          }}
          passkey={passkey}
        />
      )}
    </div>
  );
};

export default AdminDashboard;