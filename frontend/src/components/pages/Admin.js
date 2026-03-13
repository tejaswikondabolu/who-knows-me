import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [activeTab, setActiveTab] = useState('views');
  const [views, setViews] = useState([]);
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load views from localStorage
    const savedViews = JSON.parse(localStorage.getItem('tejaswiViews') || '[]');
    setViews(savedViews);

    // Load quiz scores from localStorage
    const savedScores = JSON.parse(localStorage.getItem('quizScores') || '[]');
    setScores(savedScores);

    // Load fun quiz data
    const funData = JSON.parse(localStorage.getItem('funQuizData') || '[]');
    setFunQuiz(funData);
  }, []);

  const [funQuiz, setFunQuiz] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const deleteView = (index) => {
    const newViews = views.filter((_, i) => i !== index);
    setViews(newViews);
    localStorage.setItem('tejaswiViews', JSON.stringify(newViews));
  };

  const clearAll = (type) => {
    if (window.confirm(`Are you sure you want to delete all ${type}?`)) {
      if (type === 'views') {
        localStorage.removeItem('tejaswiViews');
        setViews([]);
      } else if (type === 'scores') {
        localStorage.removeItem('quizScores');
        setScores([]);
      } else {
        localStorage.removeItem('funQuizData');
        setFunQuiz([]);
      }
    }
  };

  return (
    <div className="page admin-page">
      <div className="admin-card">
        <div className="admin-header">
          <h1>💜 Admin Dashboard</h1>
          <p>View all submissions for Tejaswi</p>
        </div>

        <div className="admin-tabs">
          <button 
            className={`tab ${activeTab === 'views' ? 'active' : ''}`}
            onClick={() => setActiveTab('views')}
          >
            Views About Her 💭
            <span className="tab-count">{views.length}</span>
          </button>
          <button 
            className={`tab ${activeTab === 'scores' ? 'active' : ''}`}
            onClick={() => setActiveTab('scores')}
          >
            Quiz Scores 🏆
            <span className="tab-count">{scores.length}</span>
          </button>
          <button 
            className={`tab ${activeTab === 'fun' ? 'active' : ''}`}
            onClick={() => setActiveTab('fun')}
          >
            Fun Quiz 🎉
            <span className="tab-count">{funQuiz.length}</span>
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'views' && (
            <div className="views-section">
              {views.length === 0 ? (
                <p className="empty-message">No views submitted yet 💜</p>
              ) : (
                views.map((item, index) => (
                  <div key={index} className="view-item">
                    <p className="view-text">"{item.view}"</p>
                    <div className="view-meta">
                      <span className="view-time">{formatDate(item.time)}</span>
                      <button 
                        className="delete-btn"
                        onClick={() => deleteView(index)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
              {views.length > 0 && (
                <button 
                  className="clear-all-btn"
                  onClick={() => clearAll('views')}
                >
                  Clear All Views
                </button>
              )}
            </div>
          )}

          {activeTab === 'scores' && (
            <div className="scores-section">
              {scores.length === 0 ? (
                <p className="empty-message">No quiz scores yet 🏆</p>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Score</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scores
                      .sort((a, b) => b.score - a.score)
                      .map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td className="score-cell">{item.score}/21</td>
                          <td>{formatDate(item.time)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
              {scores.length > 0 && (
                <button 
                  className="clear-all-btn"
                  onClick={() => clearAll('scores')}
                >
                  Clear All Scores
                </button>
              )}
            </div>
          )}

          {activeTab === 'fun' && (
            <div className="fun-section">
              {funQuiz.length === 0 ? (
                <p className="empty-message">No fun quiz submissions yet 🎉</p>
              ) : (
                funQuiz.map((item, index) => (
                  <div key={index} className="fun-item">
                    <p className="fun-name">{item.name}</p>
                    <div className="fun-answers">
                      {item.answers.map((ans, i) => (
                        <span key={i} className="fun-answer">{ans}</span>
                      ))}
                    </div>
                    <span className="fun-time">{formatDate(item.time)}</span>
                  </div>
                ))
              )}
              {funQuiz.length > 0 && (
                <button 
                  className="clear-all-btn"
                  onClick={() => clearAll('fun')}
                >
                  Clear All Fun Quiz
                </button>
              )}
            </div>
          )}
        </div>

        <button 
          className="back-btn"
          onClick={() => navigate('/')}
        >
          ← Back to Quiz
        </button>
      </div>
    </div>
  );
}

export default Admin;
