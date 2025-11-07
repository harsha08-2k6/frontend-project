import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ role, activeItem, setActiveItem }) => {
  const studentMenuItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'progress', label: 'Progress', icon: '📈' },
    { id: 'assignments', label: 'Assignments', icon: '📝' },
    { id: 'quizzes', label: 'Quizzes', icon: '❓' },
    { id: 'virtualLab', label: 'Virtual Lab', icon: '💻' }
  ];

  const teacherMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'students', label: 'Students', icon: '👥' },
    { id: 'assignments', label: 'Assignments', icon: '📝' },
    { id: 'progress', label: 'Work Progress', icon: '📈' },
    { id: 'plagiarism', label: 'Plagiarism', icon: '🔍' },
    { id: 'community', label: 'Community', icon: '🌐' },
    { id: 'analytics', label: 'Analytics', icon: '📊' }
  ];

  const menuItems = role === 'teacher' ? teacherMenuItems : studentMenuItems;

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="brand">
          <span className="brand-logo">🎓</span>
          <span className="brand-name">EduPro</span>
        </div>
        <h2>{role === 'teacher' ? 'Teacher Portal' : 'Student Portal'}</h2>
      </div>
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => setActiveItem(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-item" onClick={handleLogout}>
          <span className="sidebar-icon">🚪</span>
          <span className="sidebar-label">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;