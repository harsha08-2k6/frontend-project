import React, { useState } from 'react';
import { courses, quizzes, topicResources } from '../../data/demoData';
import '../../styles/StudentComponents.css';

const Quizzes = ({ user }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [showTopics, setShowTopics] = useState(false);
  const [previousQuizzes, setPreviousQuizzes] = useState([
    { id: 'prev-1', title: 'JavaScript Basics', date: '2023-05-15', score: 85 },
    { id: 'prev-2', title: 'HTML & CSS', date: '2023-05-10', score: 92 },
    { id: 'prev-3', title: 'Python Fundamentals', date: '2023-05-05', score: 78 }
  ]);

  const handleTopicChange = (e) => {
    const topic = e.target.value;
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const toggleTopicsView = () => {
    setShowTopics(!showTopics);
  };

  const handleQuestionCountChange = (e) => {
    setQuestionCount(parseInt(e.target.value) || 1);
  };

  const handleGenerateQuiz = () => {
    if (selectedTopics.length === 0) {
      alert('Please select at least one topic');
      return;
    }

    // Simulate quiz generation
    const allQuestions = [];
    quizzes.forEach(quiz => {
      quiz.questions.forEach(question => {
        if (selectedTopics.includes(question.topic)) {
          allQuestions.push(question);
        }
      });
    });

    // If not enough questions, add some random ones
    if (allQuestions.length < questionCount) {
      quizzes.forEach(quiz => {
        quiz.questions.forEach(question => {
          if (!allQuestions.includes(question)) {
            allQuestions.push(question);
          }
        });
      });
    }

    // Shuffle and take the requested number
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    const newQuiz = {
      id: 'generated-' + Date.now(),
      title: 'Custom Quiz',
      questions: selected
    };

    setGeneratedQuiz(newQuiz);
    setAnswers({});
    setQuizSubmitted(false);
    setQuizResults(null);
  };

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleSubmitQuiz = () => {
    if (!generatedQuiz) return;

    // Calculate results
    const mistakes = [];
    let score = 0;

    generatedQuiz.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        score++;
      } else {
        mistakes.push(question);
      }
    });

    const finalScore = Math.round((score / generatedQuiz.questions.length) * 100);

    setQuizResults({
      score: finalScore,
      mistakes: mistakes
    });

    setQuizSubmitted(true);
  };

  // Get all unique topics from courses
  const allTopics = [];
  courses.forEach(course => {
    course.topics.forEach(topic => {
      if (!allTopics.includes(topic)) {
        allTopics.push(topic);
      }
    });
  });

  return (
    <div className="quizzes-container">
      <div className="quiz-layout">
        <div className="quiz-main-content">
          <div className="section-header">
            <h2>Quizzes</h2>
          </div>

          {!generatedQuiz && (
            <div className="quiz-generator">
              <h3>Generate Custom Quiz</h3>
              <div className="generator-form">
                <div className="form-group">
                  <button 
                    className="topic-select-btn" 
                    onClick={toggleTopicsView}
                  >
                    {showTopics ? 'Hide Topics' : 'Select Topics'}
                  </button>
                  
                  {showTopics && (
                    <div className="topic-checkboxes">
                      {allTopics.map((topic, index) => (
                        <div key={index} className="topic-checkbox">
                          <input
                            type="checkbox"
                            id={`topic-${index}`}
                            value={topic}
                            checked={selectedTopics.includes(topic)}
                            onChange={handleTopicChange}
                          />
                          <label htmlFor={`topic-${index}`}>{topic}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Number of Questions:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={questionCount}
                      onChange={handleQuestionCountChange}
                      min="1"
                      max="30"
                    />
                  </div>
                  <button className="generate-btn" onClick={handleGenerateQuiz}>
                    Generate Quiz
                  </button>
                </div>
              </div>
            </div>
          )}
        
        </div>
        
        <div className="quiz-sidebar">
          <div className="previous-quizzes">
            <h3>Previous Quizzes</h3>
            <div className="quiz-history-list">
              {previousQuizzes.map(quiz => (
                <div key={quiz.id} className="quiz-history-item">
                  <div className="quiz-history-title">{quiz.title}</div>
                  <div className="quiz-history-meta">
                    <span className="quiz-date">{quiz.date}</span>
                    <span className="quiz-score">Score: {quiz.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {generatedQuiz && !quizSubmitted && (
        <div className="quiz-questions">
          <h3>{generatedQuiz.title}</h3>
          {generatedQuiz.questions.map((question, index) => (
            <div key={question.id} className="quiz-question">
              <div className="question-text">
                {index + 1}. {question.question}
              </div>
              <div className="options-list">
                {question.options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className={`option-item ${answers[question.id] === option ? 'selected' : ''}`}
                    onClick={() => handleAnswerSelect(question.id, option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button className="submit-quiz-btn" onClick={handleSubmitQuiz}>
            Submit Quiz
          </button>
        </div>
      )}

      {quizSubmitted && quizResults && (
        <div className="feedback-container">
          <div className="feedback-header">
            <h3>Quiz Results</h3>
          </div>
          <div className="feedback-score">
            Your Score: {quizResults.score}%
          </div>

          {quizResults.mistakes.length > 0 ? (
            <div className="mistakes-section">
              <h4>Review Your Mistakes:</h4>
              {quizResults.mistakes.map((question) => {
                const resource = topicResources[question.topic];
                return (
                  <div key={question.id} className="mistake-item">
                    <div className="mistake-question">{question.question}</div>
                    <div className="correct-answer">
                      Correct Answer: {question.correctAnswer}
                    </div>
                    <div className="resource-section">
                      <h4>Resources to Learn More:</h4>
                      <div className="resource-links">
                        <a
                          href={resource?.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="resource-link"
                        >
                          Watch Video Tutorial
                        </a>
                      </div>
                      <div className="resource-text">
                        {resource?.text}
                      </div>
                      <pre className="resource-code">
                        {resource?.code}
                      </pre>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="perfect-score">
              Perfect score! Great job!
            </div>
          )}

          <button
            className="generate-btn"
            onClick={() => {
              setGeneratedQuiz(null);
              setQuizSubmitted(false);
              setQuizResults(null);
            }}
          >
            Create New Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quizzes;