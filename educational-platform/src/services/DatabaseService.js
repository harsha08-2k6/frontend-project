// DatabaseService.js - A service to handle database operations for assignments and submissions
import { assignments as initialAssignments, studentAccounts } from '../data/demoData';

// Initialize database with demo data
let db = {
  assignments: [...initialAssignments],
  submissions: []
};

// Event listeners for database changes
const listeners = {
  assignments: [],
  submissions: []
};

// Subscribe to database changes
const subscribe = (entity, callback) => {
  listeners[entity].push(callback);
  return () => {
    listeners[entity] = listeners[entity].filter(cb => cb !== callback);
  };
};

// Notify all listeners about changes
const notifyListeners = (entity) => {
  listeners[entity].forEach(callback => callback(db[entity]));
};

// Get all assignments
const getAssignments = () => {
  return [...db.assignments];
};

// Get assignments for a specific student
const getStudentAssignments = (studentId) => {
  return db.assignments.map(assignment => {
    // Create a copy of the assignment
    const assignmentCopy = { ...assignment };
    
    // If this student has a submission for this assignment, include it
    if (assignment.submissions && assignment.submissions[studentId]) {
      assignmentCopy.studentSubmission = assignment.submissions[studentId];
    }
    
    return assignmentCopy;
  });
};

// Get submissions for a teacher to review
const getTeacherSubmissions = (assignmentId) => {
  const assignment = db.assignments.find(a => a.id === assignmentId);
  if (!assignment) {
    throw new Error(`Assignment with ID ${assignmentId} not found`);
  }
  
  // Return all student submissions for this assignment
  const submissions = [];
  if (assignment.submissions) {
    Object.entries(assignment.submissions).forEach(([studentId, submission]) => {
      if (submission.submitted) {
        submissions.push({
          studentId,
          ...submission
        });
      }
    });
  }
  
  return submissions;
};

// Create a new assignment
const createAssignment = (assignment) => {
  // Generate a unique ID
  const id = Date.now().toString();
  
  // Create submissions object for all students
  const submissions = {};
  studentAccounts.forEach(student => {
    submissions[student.id] = { 
      submitted: false,
      studentId: student.id,
      studentName: student.name
    };
  });
  
  // Add the new assignment to the database
  const newAssignment = {
    ...assignment,
    id,
    submissions,
    createdAt: new Date().toISOString()
  };
  
  db.assignments = [...db.assignments, newAssignment];
  notifyListeners('assignments');
  
  return newAssignment;
};

// Submit an assignment
const submitAssignment = (assignmentId, submission) => {
  // Find the assignment
  const assignmentIndex = db.assignments.findIndex(a => a.id === assignmentId);
  
  if (assignmentIndex === -1) {
    throw new Error(`Assignment with ID ${assignmentId} not found`);
  }
  
  // Update the assignment's submissions
  const updatedAssignments = [...db.assignments];
  const assignment = { ...updatedAssignments[assignmentIndex] };
  
  // Ensure submissions object exists
  if (!assignment.submissions) {
    assignment.submissions = {};
  }
  
  // Update the student's submission
  assignment.submissions[submission.studentId] = {
    ...submission,
    submitted: true,
    submittedDate: new Date().toISOString()
  };
  
  updatedAssignments[assignmentIndex] = assignment;
  db.assignments = updatedAssignments;
  
  notifyListeners('assignments');
  
  return assignment;
};

// Grade a submission
const gradeSubmission = (assignmentId, studentId, grade) => {
  // Find the assignment
  const assignmentIndex = db.assignments.findIndex(a => a.id === assignmentId);
  
  if (assignmentIndex === -1) {
    throw new Error(`Assignment with ID ${assignmentId} not found`);
  }
  
  // Update the assignment's submissions
  const updatedAssignments = [...db.assignments];
  const assignment = { ...updatedAssignments[assignmentIndex] };
  
  // Ensure submissions object exists
  if (!assignment.submissions || !assignment.submissions[studentId]) {
    throw new Error(`Submission for student ${studentId} not found`);
  }
  
  // Update the grade
  assignment.submissions[studentId] = {
    ...assignment.submissions[studentId],
    grade: grade
  };
  
  updatedAssignments[assignmentIndex] = assignment;
  db.assignments = updatedAssignments;
  
  notifyListeners('assignments');
  
  return assignment;
};

// Export all functions
const DatabaseService = {
  getAssignments,
  getStudentAssignments,
  getTeacherSubmissions,
  createAssignment,
  submitAssignment,
  gradeSubmission,
  subscribe
};

export default DatabaseService;