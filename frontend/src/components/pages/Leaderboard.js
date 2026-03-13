import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch('https://who-knows-me.onrender.com/api/leaderboard');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setScores(data);
        setLoading(false);
      } catch (error) {
        const localScores = JSON.parse(localStorage.getItem('quizScores') || '[]');
        setScores(localScores.sort((a, b) => b.score - a.score));
        setLoading(false);
      }
    };
    fetchScores();
  }, []);

  if (loading) return <div className="page"><div className="loading">Loading... 🎯</div></div>;

  const getRankStyle = (index) => {
    if (index === 0) return { bg: 'linear-gradient(135deg, #FFD700, #FFA500)', border: '#FFD700', shadow: '0 8px 30px rgba(255, 215, 0, 0.4)' };
    if (index === 1) return { bg: 'linear-gradient(135deg, #C0C0C0, #A9A9A9)', border: '#C0C0C0', shadow: '0 8px 30px rgba(192, 192, 192, 0.4)' };
    if (index === 2) return { bg: 'linear-gradient(135deg, #CD7F32, #B87333)', border: '#CD7F32', shadow: '0 8px 30px rgba(205, 127, 50, 0.4)' };
    return { bg: 'linear-gradient(135deg, #E6E6FA, #D8BFD8)', border: '#9370DB', shadow: '0 5px 20px rgba(147, 112, 219, 0.2)' };
  };

  const top3 = scores.slice(0, 3);
  const rest = scores.slice(3);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-header">🏆 Leaderboard 🏆</h1>
      
      {scores.length === 0 ? (
        <div className="no-scores">
          <p>No scores yet!</p>
          <p>Be the first to play 🎮</p>
        </div>
      ) : (
        <>
          {/* Top 3 Podium */}
          {top3.length > 0 && (
            <div className="podium">
              {top3[1] && (
                <div className="podium-item second">
                  <div className="podium-avatar">🥈</div>
                  <div className="podium-name">{top3[1].name}</div>
                  <div className="podium-score">{top3[1].score}</div>
                  <div className="podium-stand">2nd</div>
                </div>
              )}
              {top3[0] && (
                <div className="podium-item first">
                  <div className="podium-avatar">🥇</div>
                  <div className="podium-name">{top3[0].name}</div>
                  <div className="podium-score">{top3[0].score}</div>
                  <div className="podium-stand">1st</div>
                </div>
              )}
              {top3[2] && (
                <div className="podium-item third">
                  <div className="podium-avatar">🥉</div>
                  <div className="podium-name">{top3[2].name}</div>
                  <div className="podium-score">{top3[2].score}</div>
                  <div className="podium-stand">3rd</div>
                </div>
              )}
            </div>
          )}

          {/* Rest of the list */}
          {rest.length > 0 && (
            <div className="score-list">
              {rest.map((score, index) => {
                const style = getRankStyle(index + 3);
                return (
                  <div key={score._id || index} className="score-row">
                    <div className="rank-badge">{index + 4}</div>
                    <div className="name-text">{score.name}</div>
                    <div className="score-badge" style={{ background: style.bg }}>{score.score}/21</div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      <button className="play-btn" onClick={() => navigate('/')}>Play Again 🎮</button>
    </div>
  );
}

export default Leaderboard;
