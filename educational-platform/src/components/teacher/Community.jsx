import React from 'react';
import '../../styles/TeacherComponents.css';

const Community = () => {
  // Sample student concerns/doubts
  const studentConcerns = [
    {
      id: 1,
      topic: 'Understanding Recursion',
      students: ['John Doe', 'Sarah Williams'],
      description: 'Having trouble understanding when to use recursion vs iteration'
    },
    {
      id: 2,
      topic: 'Database Normalization',
      students: ['Jane Smith', 'Mike Johnson'],
      description: 'Confused about 3NF and BCNF normalization forms'
    },
    {
      id: 3,
      topic: 'React Hooks',
      students: ['Alex Brown', 'Lisa Chen'],
      description: 'Need help with useEffect dependency array'
    }
  ];

  const handleResolve = (id) => {
    alert(`Marked concern #${id} as resolved`);
  };

  const handleScheduleSession = (id, topic) => {
    alert(`Scheduled a session for "${topic}"`);
  };

  return (
    <div className="community-section">
      <div className="community-header">
        <h3>Student Concerns & Questions</h3>
      </div>
      
      <div className="topic-concerns">
        {studentConcerns.map(concern => (
          <div key={concern.id} className="concern-item">
            <div className="concern-topic">{concern.topic}</div>
            <div className="concern-students">
              {concern.students.map((student, index) => (
                <span key={index} className="student-tag">{student}</span>
              ))}
            </div>
            <div className="concern-description">{concern.description}</div>
            <div className="concern-actions">
              <button 
                className="action-btn"
                onClick={() => handleResolve(concern.id)}
              >
                Mark as Resolved
              </button>
              <button 
                className="action-btn"
                onClick={() => handleScheduleSession(concern.id, concern.topic)}
              >
                Schedule Session
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;