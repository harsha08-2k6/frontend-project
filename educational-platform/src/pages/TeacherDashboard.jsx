import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/teacher/Dashboard';
import Students from '../components/teacher/Students';
import Assignments from '../components/teacher/Assignments';
import Progress from '../components/teacher/Progress';
import Plagiarism from '../components/teacher/Plagiarism';
import Community from '../components/teacher/Community';
import Analytics from '../components/teacher/Analytics';
import '../styles/Dashboard.css';

const TeacherDashboard = ({ user }) => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <Students />;
      case 'assignments':
        return <Assignments />;
      case 'progress':
        return <Progress />;
      case 'plagiarism':
        return <Plagiarism />;
      case 'community':
        return <Community />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar role="teacher" activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="header-top">
            <h1>Welcome, {user.name}</h1>
            <span className="role-pill teacher">Teacher</span>
          </div>
          <p className="header-subtitle">Manage courses, students, and analytics efficiently.</p>
          <div className="header-actions">
            <button className="action-button" onClick={() => setActiveItem('students')}>Students</button>
            <button className="action-button" onClick={() => setActiveItem('assignments')}>Assignments</button>
            <button className="action-button" onClick={() => setActiveItem('analytics')}>Analytics</button>
          </div>
        </div>
        <div className="dashboard-main">{renderContent()}</div>
      </div>
    </div>
  );
};

export default TeacherDashboard;