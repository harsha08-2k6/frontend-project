import React from 'react';
import { studentAccounts as students } from '../../data/demoData';
import '../../styles/TeacherComponents.css';

const Analytics = () => {
  
  // Calculate analytics
  const totalStudents = students.length;
  const averageProgress = Math.round(
    students.reduce((sum, student) => sum + student.overallProgress, 0) / totalStudents
  );
  const assignmentCompletion = Math.round(
    students.reduce((sum, student) => {
      const completed = student.assignments.filter(a => a.submitted).length;
      const total = student.assignments.length;
      return sum + (completed / total) * 100;
    }, 0) / totalStudents
  );
  const quizAverage = Math.round(
    students.reduce((sum, student) => {
      const quizScores = student.quizzes.map(q => q.score);
      const avg = quizScores.length > 0 
        ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length 
        : 0;
      return sum + avg;
    }, 0) / totalStudents
  );

  return (
    <div className="analytics-section">
      <div className="analytics-header">
        <h3>Student Performance Analytics</h3>
      </div>
      
      <div className="chart-container">
        <div className="chart-placeholder">
          <p>Interactive charts would be displayed here in a production environment.</p>
          <p>This would include progress trends, quiz performance, and assignment completion rates.</p>
        </div>
      </div>
      
      <div className="analytics-summary">
        <div className="summary-card">
          <div className="summary-value">{averageProgress}%</div>
          <div className="summary-label">Average Progress</div>
        </div>
        <div className="summary-card">
          <div className="summary-value">{assignmentCompletion}%</div>
          <div className="summary-label">Assignment Completion</div>
        </div>
        <div className="summary-card">
          <div className="summary-value">{quizAverage}%</div>
          <div className="summary-label">Quiz Average</div>
        </div>
        <div className="summary-card">
          <div className="summary-value">{totalStudents}</div>
          <div className="summary-label">Total Students</div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;