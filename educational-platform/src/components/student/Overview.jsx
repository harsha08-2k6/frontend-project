import React from 'react';
import { courses, assignments } from '../../data/demoData';
import '../../styles/StudentComponents.css';

const Overview = ({ user }) => {
  // Get student progress across all courses
  const studentProgress = courses.map(course => ({
    id: course.id,
    title: course.title,
    progress: course.progress[user.id] || 0
  }));

  // Get upcoming assignments
  const upcomingAssignments = assignments.filter(assignment => {
    const submission = assignment.submissions[user.id];
    return !submission || !submission.submitted;
  });

  // Calculate average progress
  const averageProgress = studentProgress.reduce((sum, course) => sum + course.progress, 0) / studentProgress.length;

  return (
    <div className="overview-container">
      <div className="overview-header">
        <h2>Student Overview</h2>
      </div>

      <div className="overview-stats">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{courses.length}</h3>
            <p>Enrolled Courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>{upcomingAssignments.length}</h3>
            <p>Pending Assignments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{averageProgress.toFixed(0)}%</h3>
            <p>Average Progress</p>
          </div>
        </div>
      </div>

      <div className="overview-section">
        <h3>Course Progress</h3>
        <div className="progress-list">
          {studentProgress.map(course => (
            <div key={course.id} className="progress-item">
              <div className="progress-info">
                <h4>{course.title}</h4>
                <span>{course.progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overview-section">
        <h3>Upcoming Assignments</h3>
        {upcomingAssignments.length > 0 ? (
          <div className="assignment-list">
            {upcomingAssignments.map(assignment => (
              <div key={assignment.id} className="assignment-item">
                <div className="assignment-title">{assignment.title}</div>
                <div className="assignment-course">
                  {courses.find(course => course.id === assignment.courseId)?.title}
                </div>
                <div className="assignment-due">Due: {assignment.dueDate}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-items">No pending assignments</p>
        )}
      </div>

      <div className="overview-section">
        <h3>Calendar</h3>
        <div className="calendar-placeholder">
          <p>Calendar with assignment deadlines would be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;