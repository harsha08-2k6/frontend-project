import React from 'react';
import { courses, studentAccounts } from '../../data/demoData';
import '../../styles/TeacherComponents.css';

const Progress = () => {
  return (
    <div className="progress-container">
      <div className="section-header">
        <h2>Student Progress</h2>
      </div>
      
      <div className="progress-overview">
        {courses.map(course => (
          <div key={course.id} className="course-progress-card">
            <div className="course-title">{course.title}</div>
            <div className="progress-table">
              <div className="progress-header">
                <div className="student-column">Student</div>
                <div className="progress-column">Progress</div>
                <div className="grade-column">Grade</div>
              </div>
              
              {studentAccounts.map(student => (
                <div key={student.id} className="progress-row">
                  <div className="student-column">{student.name}</div>
                  <div className="progress-column">
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${course.progress && course.progress[student.id] ? course.progress[student.id] : 0}%` }}
                      ></div>
                      <span className="progress-text">{course.progress && course.progress[student.id] ? course.progress[student.id] : 0}%</span>
                    </div>
                  </div>
                  <div className="grade-column">N/A</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;