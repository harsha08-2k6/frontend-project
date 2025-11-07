import React, { useState, useEffect } from 'react';
import { courses } from '../../data/demoData';
import '../../styles/StudentComponents.css';
import DatabaseService from '../../services/DatabaseService';
import FileStorageService from '../../services/FileStorageService';

const Assignments = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [assignments, setAssignments] = useState([]);
  
  // Load assignments from database
  useEffect(() => {
    // Get initial assignments
    const loadAssignments = async () => {
      try {
        const studentAssignments = await DatabaseService.getStudentAssignments(user.id);
        setAssignments(studentAssignments);
      } catch (error) {
        console.error('Error loading assignments:', error);
      }
    };
    
    loadAssignments();
    
    // Subscribe to assignment changes
    const unsubscribe = DatabaseService.subscribe('assignments', () => {
      loadAssignments();
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [user.id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file only');
        return;
      }
      if (file.size > 20 * 1024 * 1024) { // 20MB in bytes
        alert('File size exceeds 20MB limit');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleAssignmentSubmit = (assignmentId) => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    setSubmitting(true);
    
    // Upload the file first
    FileStorageService.uploadFile(selectedFile, {
      assignmentId,
      studentId: user.id
    })
      .then(fileInfo => {
        // Create submission object with file information
        const submission = {
          fileName: selectedFile.name,
          fileType: selectedFile.type,
          fileSize: selectedFile.size,
          fileUrl: fileInfo.url,
          fileId: fileInfo.id,
          studentId: user.id,
          studentName: user.name
        };
        
        // Submit the assignment to the database
        DatabaseService.submitAssignment(assignmentId, submission);
        
        setSubmitting(false);
        setSelectedFile(null);
        setSuccessMessage(`Assignment submitted successfully! Your PDF "${selectedFile.name}" is now visible to your teacher.`);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        setSubmitting(false);
        alert('Error uploading file. Please try again.');
      });
  };

  const getPendingAssignments = () => {
    return assignments.filter(assignment => {
      return !assignment.studentSubmission || !assignment.studentSubmission.submitted;
    });
  };

  const getSubmittedAssignments = () => {
    return assignments.filter(assignment => {
      return assignment.studentSubmission && assignment.studentSubmission.submitted;
    });
  };
  
  // This function is already defined above, removing duplicate declaration

  const pendingAssignments = getPendingAssignments();
  const submittedAssignments = getSubmittedAssignments();

  return (
    <div className="assignments-container">
      <div className="section-header">
        <h2>Assignments</h2>
      </div>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <div className="assignment-section">
        <h3>Pending Assignments</h3>
        {pendingAssignments.length > 0 ? (
          <div className="assignment-list">
            {pendingAssignments.map(assignment => {
              const course = courses.find(c => c.id === assignment.courseId);
              return (
                <div key={assignment.id} className="assignment-item">
                  <div className="assignment-title">{assignment.title}</div>
                  <div className="assignment-course">{course?.title}</div>
                  <div className="assignment-description">{assignment.description}</div>
                  <div className="assignment-due">Due: {assignment.dueDate}</div>
                  
                  <div className="assignment-upload">
                    <div className="file-upload-container">
                      <label className="file-upload-label">
                        <span className="upload-icon">📎</span>
                        {selectedFile ? selectedFile.name : 'Choose PDF file'}
                        <input 
                          type="file" 
                          accept=".pdf" 
                          onChange={handleFileChange}
                          className="file-input"
                          style={{ display: 'none' }}
                        />
                      </label>
                      {selectedFile && (
                        <div className="selected-file">
                          <span className="pdf-icon">📄</span>
                          <span className="file-name">{selectedFile.name}</span>
                          <span className="file-size">({Math.round(selectedFile.size / 1024)} KB)</span>
                        </div>
                      )}
                    </div>
                    <button 
                      className="submit-btn"
                      onClick={() => handleAssignmentSubmit(assignment.id)}
                      disabled={submitting || !selectedFile}
                    >
                      {submitting ? 'Submitting...' : 'Submit Assignment'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-items">No pending assignments</p>
        )}
      </div>

      <div className="assignment-section">
        <h3>Submitted Assignments</h3>
        {submittedAssignments.length > 0 ? (
          <div className="assignment-list">
            {submittedAssignments.map(assignment => {
              const course = courses.find(c => c.id === assignment.courseId);
              const submission = assignment.studentSubmission;
              return (
                <div key={assignment.id} className="assignment-item submitted">
                  <div className="assignment-title">{assignment.title}</div>
                  <div className="assignment-course">{course?.title}</div>
                  <div className="assignment-description">{assignment.description}</div>
                  <div className="assignment-status">
                    <span className="status-label">Status:</span> Submitted
                  </div>
                  <div className="submission-file">
                    <div className="pdf-icon">📄</div>
                    <div className="file-name">{submission.fileName}</div>
                    <button 
                      className="view-btn"
                      onClick={() => window.open(submission.fileUrl, '_blank')}
                    >
                      View PDF
                    </button>
                  </div>
                  <div className="assignment-grade">
                    <span className="grade-label">Grade:</span> {submission.grade ? `${submission.grade}/100` : 'Not graded yet'}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-items">No submitted assignments</p>
        )}
      </div>
    </div>
  );
};

export default Assignments;