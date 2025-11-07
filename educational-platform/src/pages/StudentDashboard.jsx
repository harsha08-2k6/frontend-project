import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Overview from '../components/student/Overview';
import Progress from '../components/student/Progress';
import Assignments from '../components/student/Assignments';
import Quizzes from '../components/student/Quizzes';
import VirtualLab from '../components/student/VirtualLab';
import '../styles/Dashboard.css';

const StudentDashboard = ({ user }) => {
  const [activeItem, setActiveItem] = useState('overview');

  const renderContent = () => {
    switch (activeItem) {
      case 'overview':
        return <Overview user={user} />;
      case 'progress':
        return <Progress user={user} />;
      case 'assignments':
        return <Assignments user={user} />;
      case 'quizzes':
        return <Quizzes user={user} />;
      case 'virtualLab':
        return <VirtualLab />;
      default:
        return <Overview user={user} />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar role="student" activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="header-top">
            <h1>Welcome, {user.name}</h1>
            <span className="role-pill student">Student</span>
          </div>
          <p className="header-subtitle">All your learning tools in one place.</p>
          <div className="header-actions">
            <button className="action-button" onClick={() => setActiveItem('assignments')}>Assignments</button>
            <button className="action-button" onClick={() => setActiveItem('quizzes')}>Quizzes</button>
            <button className="action-button" onClick={() => setActiveItem('virtualLab')}>Virtual Lab</button>
          </div>
        </div>
        <div className="dashboard-main">{renderContent()}</div>
      </div>
    </div>
  );
};

export default StudentDashboard;