import React from 'react';
import { useNavigate } from 'react-router-dom';
import { studentAccounts } from '../data/demoData';
import DatabaseService from '../services/DatabaseService';
import '../styles/AdminDashboard.css';

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  const allAssignments = DatabaseService.getAssignments();

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className="admin-dashboard">
      <button className="logout-button" onClick={handleLogout}>
        🚪 Logout
      </button>
      
      <div className="admin-header">
        <h1>Admin Portal</h1>
        <p>Welcome, {user?.name || 'Admin'} - Manage your educational platform</p>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <h2>
            <span className="admin-card-icon">🚀</span>
            Quick Access
          </h2>
          <div className="portal-buttons">
            <button 
              className="portal-button teacher" 
              onClick={() => navigate('/teacher-dashboard')}
            >
              <span>👨‍🏫</span>
              Open Teacher Portal
            </button>
            <button 
              className="portal-button student" 
              onClick={() => navigate('/student-dashboard')}
            >
              <span>👨‍🎓</span>
              Open Student Portal
            </button>
          </div>
        </div>

        <div className="admin-card">
          <h2>
            <span className="admin-card-icon">📊</span>
            Platform Overview
          </h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{studentAccounts.length}</div>
              <div className="stat-label">Students</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{allAssignments.length}</div>
              <div className="stat-label">Assignments</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1</div>
              <div className="stat-label">Teacher</div>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h2>
            <span className="admin-card-icon">📝</span>
            Recent Assignments
          </h2>
          <div className="assignments-list">
            {allAssignments.length === 0 ? (
              <div className="no-assignments">
                No assignments available yet
              </div>
            ) : (
              allAssignments.map((assignment) => (
                <div key={assignment.id} className="assignment-item">
                  <div className="assignment-title">{assignment.title}</div>
                  <div className="assignment-due">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;