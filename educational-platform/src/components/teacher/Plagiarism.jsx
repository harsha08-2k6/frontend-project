import React, { useState } from 'react';
import { demoData } from '../../data/demoData';
import '../../styles/TeacherComponents.css';

const Plagiarism = () => {
  const [plagiarismResults, setPlagiarismResults] = useState([]);
  const [scanning, setScanning] = useState(false);

  // Simulated plagiarism detection
  const detectPlagiarism = () => {
    setScanning(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Demo plagiarism results
      const results = [
        {
          id: 1,
          students: ['John Doe', 'Jane Smith'],
          similarityScore: '85%',
          content: 'The algorithm uses a recursive approach to solve the problem by dividing it into smaller subproblems...'
        },
        {
          id: 2,
          students: ['Mike Johnson', 'Sarah Williams'],
          similarityScore: '72%',
          content: 'The implementation of the binary search tree follows the standard approach with insert, delete, and search operations...'
        }
      ];
      
      setPlagiarismResults(results);
      setScanning(false);
    }, 1500);
  };

  return (
    <div className="plagiarism-section">
      <div className="plagiarism-header">
        <h3>Plagiarism Detection</h3>
        <button 
          className="scan-btn" 
          onClick={detectPlagiarism}
          disabled={scanning}
        >
          {scanning ? 'Scanning...' : 'Scan Assignments'}
        </button>
      </div>
      
      {plagiarismResults.length > 0 ? (
        <div className="plagiarism-results">
          {plagiarismResults.map(result => (
            <div key={result.id} className="plagiarism-item">
              <div className="plagiarism-students">
                {result.students.join(' and ')}
                <span className="similarity-score">{result.similarityScore} similar</span>
              </div>
              <div className="plagiarism-content">
                {result.content}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          {scanning ? 
            'Scanning assignments for similarities...' : 
            'Click "Scan Assignments" to detect potential plagiarism between student submissions.'}
        </div>
      )}
    </div>
  );
};

export default Plagiarism;