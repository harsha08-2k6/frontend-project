import React, { useState, useEffect } from 'react';
import { studentAccounts as students } from '../../data/demoData';
import '../../styles/TeacherComponents.css';
import DatabaseService from '../../services/DatabaseService';
import FileStorageService from '../../services/FileStorageService';

const Assignments = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [assignments, setAssignments] = useState([]);
  
  // Initialize with assignments from database
  useEffect(() => {
    // Get initial assignments
    setAssignments(DatabaseService.getAssignments());
    
    // Subscribe to assignment changes
    const unsubscribe = DatabaseService.subscribe('assignments', (updatedAssignments) => {
      setAssignments(updatedAssignments);
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  
  // Get all submissions from assignments
  const getSubmissions = () => {
    const allSubmissions = [];
    
    assignments.forEach(assignment => {
      if (assignment.submissions) {
        Object.entries(assignment.submissions).forEach(([studentId, submission]) => {
          if (submission.submitted) {
            allSubmissions.push({
              id: `${assignment.id}_${studentId}`,
              assignmentId: assignment.id,
              title: assignment.title,
              studentName: submission.studentName || 'Unknown Student',
              studentId: studentId,
              submittedDate: submission.submittedDate,
              fileName: submission.fileName,
              fileUrl: submission.fileUrl,
              grade: submission.grade
            });
          }
        });
      }
    });
    
    return allSubmissions;
  };
  
  const submissions = getSubmissions();

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    
    if (!title || !description || !dueDate) {
      return;
    }
    
    // Create new assignment using database service
    DatabaseService.createAssignment({
      title,
      description,
      dueDate,
      courseId: "course1", // Default to first course
      createdAt: new Date().toISOString()
    });
    
    // Reset form and show success message
    setTitle('');
    setDescription('');
    setDueDate('');
    setSuccessMessage('Assignment created successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };
  
  const handleGradeSubmission = (submissionId, grade) => {
    // Parse the composite ID to get assignment and student IDs
    const [assignmentId, studentId] = submissionId.split('_');
    
    // Update the grade in the database
    DatabaseService.gradeSubmission(assignmentId, studentId, grade);
    
    setSuccessMessage(`Submission graded successfully!`);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="assignments-section">
      <h3>Create Assignment</h3>
      
      <form className="create-assignment-form" onSubmit={handleCreateAssignment}>
        {successMessage && (
          <div className="success-message" style={{ color: 'green', marginBottom: '15px' }}>
            {successMessage}
          </div>
        )}
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Assignment Title</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter assignment title"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter assignment description"
            required
          ></textarea>
        </div>
        
        <button type="submit" className="create-btn">Create Assignment</button>
      </form>
      
      <h3>Student Submissions</h3>
      
      <div className="submissions-list">
        {submissions.map(submission => (
          <div key={submission.id} className="submission-item">
            <div className="submission-student">{submission.studentName}</div>
            <div className="submission-title">{submission.title}</div>
            <div className="submission-date">
              Submitted: {new Date(submission.submittedDate).toLocaleDateString()}
            </div>
            <div className="submission-file">
              <div className="pdf-icon">📄</div>
              <div className="file-name">
                {submission.fileName || "Unnamed file"}
              </div>
              <button 
                className="view-btn" 
                onClick={() => submission.fileUrl ? window.open(submission.fileUrl, '_blank') : alert('PDF not available')}
              >
                View PDF
              </button>
            </div>
            
            <div className="grading-form">
              <input
                type="number"
                className="grade-input"
                placeholder="Grade"
                min="0"
                max="100"
                defaultValue={submission.grade || ''}
                id={`grade-${submission.id}`}
              />
              <button 
                className="grade-btn"
                onClick={() => handleGradeSubmission(submission.id, document.getElementById(`grade-${submission.id}`).value)}
              >
                Submit Grade
              </button>
            </div>
          </div>
        ))}
        
        {submissions.length === 0 && (
          <div className="no-submissions">No submissions yet.</div>
        )}
      </div>
    </div>
  );
};

export default Assignments;