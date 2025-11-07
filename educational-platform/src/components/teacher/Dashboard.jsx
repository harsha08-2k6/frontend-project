import React from 'react';
import { studentAccounts, courses, quizResults } from '../../data/demoData';
import '../../styles/TeacherComponents.css';

const Dashboard = () => {
  // Calculate average progress for each student across all courses
  const studentProgress = studentAccounts.map(student => {
    let totalProgress = 0;
    let courseCount = 0;
    
    courses.forEach(course => {
      if (course.progress[student.id]) {
        totalProgress += course.progress[student.id];
        courseCount++;
      }
    });
    
    const avgProgress = courseCount > 0 ? totalProgress / courseCount : 0;
    
    // Get quiz mistakes for this student
    const studentQuizzes = quizResults[student.id] || [];
    const mistakeTopics = new Set();
    
    studentQuizzes.forEach(quiz => {
      if (quiz.mistakes && quiz.mistakes.length > 0) {
        quiz.mistakes.forEach(mistakeId => {
          // Find the quiz and question
          const quizData = courses.find(course => {
            const topics = course.topics;
            return topics.some(topic => {
              if (mistakeId.includes(topic)) {
                mistakeTopics.add(topic);
                return true;
              }
              return false;
            });
          });
        });
      }
    });
    
    return {
      ...student,
      avgProgress,
      mistakeTopics: Array.from(mistakeTopics)
    };
  });

  return (
    <div className="teacher-dashboard">
      <div className="dashboard-header">
        <h2>Teacher Dashboard</h2>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{studentAccounts.length}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{courses.length}</h3>
            <p>Active Courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>2</h3>
            <p>Active Assignments</p>
          </div>
        </div>
      </div>
      
      <div className="student-progress-section">
        <h3>Student Progress Overview</h3>
        <div className="student-progress-list">
          {studentProgress.map(student => (
            <div key={student.id} className="student-progress-item">
              <div className="student-info">
                <div className="student-name">{student.name}</div>
                <div className="student-email">{student.email}</div>
              </div>
              <div className="progress-info">
                <div className="progress-percentage">{student.avgProgress.toFixed(0)}%</div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${student.avgProgress}%` }}
                  ></div>
                </div>
              </div>
              {student.mistakeTopics.length > 0 && (
                <div className="mistake-topics">
                  <span>Struggling with:</span>
                  {student.mistakeTopics.map((topic, index) => (
                    <span key={index} className="topic-tag">{topic}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">📝</div>
            <div className="activity-content">
              <div className="activity-text">
                <strong>Alex Johnson</strong> submitted assignment <strong>Python Basics Exercise</strong>
              </div>
              <div className="activity-time">2 hours ago</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">❓</div>
            <div className="activity-content">
              <div className="activity-text">
                <strong>Jamie Williams</strong> completed quiz <strong>HTML Basics</strong> with score 50%
              </div>
              <div className="activity-time">3 hours ago</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">📝</div>
            <div className="activity-content">
              <div className="activity-text">
                <strong>Taylor Brown</strong> submitted assignment <strong>HTML/CSS Portfolio</strong>
              </div>
              <div className="activity-time">Yesterday</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;