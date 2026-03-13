import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from './Confetti';
import ShareCard from './ShareCard';
import { playFinishSound } from '../../utils/sounds';

function Result({ userName, score, totalQuestions }) {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(true);
  const [savedLocally, setSavedLocally] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    const saveScore = async () => {
      try {
        setIsSaving(true);
        const response = await fetch('http://localhost:5000/api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: userName, score })
        });
        
        if (!response.ok) {
          throw new Error('Failed to save score');
        }
        
        await response.json();
        setIsSaving(false);
      } catch (error) {
        console.log('Backend unavailable, saving to localStorage');
        const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
        scores.push({ name: userName, score, time: new Date().toISOString() });
        localStorage.setItem('quizScores', JSON.stringify(scores));
        setSavedLocally(true);
        setIsSaving(false);
      }
    };

    if (userName && score !== undefined) {
      saveScore();
      setShowConfetti(true);
      playFinishSound();
    }
  }, [userName, score]);

  const getEmoji = (score) => {
    if (score >= 17) return '🏆';
    if (score >= 13) return '🌟';
    if (score >= 8) return '👍';
    return '🎯';
  };

  return (
    <div className="page result-page">
      {showConfetti && <Confetti />}
      <div className="result-card">
        <h1 className="result-title">Quiz Complete! {getEmoji(score)}</h1>
        
        <div className="score-display">
          <div className="score-circle">
            <span className="score-number">{score}</span>
            <span className="score-total">/{totalQuestions || 21}</span>
          </div>
        </div>

        <h2 className="player-name">Great job, {userName}! 🎉</h2>

        {isSaving ? (
          <p className="status-message">Saving your score... ⌛</p>
        ) : savedLocally ? (
          <p className="status-message success">Score saved locally! ✨</p>
        ) : (
          <p className="status-message success">Score saved successfully! ✨</p>
        )}

        <div className="button-group">
          <button 
            className="action-button leaderboard"
            onClick={() => navigate('/leaderboard')}
          >
            View Leaderboard 🏆
          </button>
          <button 
            className="action-button share"
            onClick={() => setShowShare(true)}
          >
            Share Result 📸
          </button>
          <button 
            className="action-button play-again"
            onClick={() => navigate('/')}
          >
            Play Again 🎮
          </button>
          {/*<button 
            className="action-button fun-quiz"
            onClick={() => navigate('/fun')}
          >
            What do you think about her? 💭
          </button> */}
        </div>
      </div>
      {showShare && <ShareCard userName={userName} score={score} totalQuestions={totalQuestions} onClose={() => setShowShare(false)} />}
    </div>
  );
}

export default Result;
