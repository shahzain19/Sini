import React from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

export const ProjectsTab = ({ projects, onEdit, onDelete, onAdd, loading }) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
      <button
        onClick={onAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        disabled={loading}
      >
        <Plus size={16} />
        Add Project
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{project.description}</p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                View Project →
              </a>
            )}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => onEdit(project)}
                className="text-blue-600 hover:text-blue-800"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDelete(project.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const AnnouncementsTab = ({ announcements, onEdit, onDelete, onAdd, loading }) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-900">Announcements</h2>
      <button
        onClick={onAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        disabled={loading}
      >
        <Plus size={16} />
        Add Announcement
      </button>
    </div>

    <div className="space-y-4">
      {announcements.map((announcement) => (
        <div key={announcement.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg">{announcement.title}</h3>
                {announcement.is_active ? (
                  <Eye size={16} className="text-green-600" />
                ) : (
                  <EyeOff size={16} className="text-gray-400" />
                )}
              </div>
              <p className="text-gray-600 mb-2">{announcement.content}</p>
              <p className="text-sm text-gray-400">
                Created: {new Date(announcement.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(announcement)}
                className="text-blue-600 hover:text-blue-800"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDelete(announcement.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);