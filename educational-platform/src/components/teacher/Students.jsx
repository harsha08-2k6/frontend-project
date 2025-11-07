import React from 'react';
import { studentAccounts } from '../../data/demoData';
import '../../styles/TeacherComponents.css';

const Students = () => {
  return (
    <div className="students-container">
      <div className="section-header">
        <h2>Students</h2>
      </div>
      
      <div className="students-list">
        {studentAccounts.map(student => (
          <div key={student.id} className="student-card">
            <div className="student-avatar">
              <div className="avatar-placeholder">{student.name.charAt(0)}</div>
            </div>
            <div className="student-info">
              <div className="student-name">{student.name}</div>
              <div className="student-email">{student.email}</div>
              <div className="student-id">ID: {student.id}</div>
            </div>
            <div className="student-actions">
              <button className="view-profile-btn">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;