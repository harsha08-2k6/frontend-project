import React, { useState } from 'react';
import { courses } from '../../data/demoData';
import '../../styles/StudentComponents.css';

const Progress = ({ user }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleContinue = (course) => {
    setSelectedCourse(course);
  };

  const renderTopics = () => {
    if (!selectedCourse) return null;

    const course = courses.find(c => c.id === selectedCourse);
    if (!course) return null;

    return (
      <div className="course-topics-modal">
        <div className="modal-header">
          <h3>{course.title} - Topics</h3>
          <button onClick={() => setSelectedCourse(null)}>Close</button>
        </div>
        <div className="modal-body">
          <ul className="topic-list">
            {course.topics.map((topic, index) => (
              <li key={index}>
                <div className="topic-item">
                  <span>{topic}</span>
                  <a href={`https://www.google.com/search?q=${encodeURIComponent(topic + ' tutorial')}`} target="_blank" rel="noopener noreferrer">
                    Learn More
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="progress-container">
      <div className="section-header">
        <h2>My Courses</h2>
      </div>

      <div className="course-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-header">
              <h3>{course.title}</h3>
            </div>
            <div className="course-body">
              <div className="course-description">{course.description}</div>
              <div className="course-progress">
                <div className="progress-info">
                  <span>Progress</span>
                  <span>{course.progress[user.id] || 0}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${course.progress[user.id] || 0}%` }}
                  ></div>
                </div>
              </div>
              <button 
                className="continue-btn"
                onClick={() => handleContinue(course.id)}
              >
                Continue Learning
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCourse && renderTopics()}
    </div>
  );
};

export default Progress;