import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function ShareCard({ userName, score, totalQuestions, onClose }) {
  const canvasRef = useRef(null);
  const [downloaded, setDownloaded] = useState(false);
  const navigate = useNavigate();
  const total = totalQuestions || 21;

  const getMessage = () => {
    if (score >= 17) return "Best Friend Alert! 💜";
    if (score >= 13) return "Pretty close! 🌟";
    if (score >= 8) return "We need to hang out more! 😅";
    return "Are you even trying? 😜";
  };

  const generateCard = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 400, 500);
    gradient.addColorStop(0, '#E6E6FA');
    gradient.addColorStop(0.5, '#F5F5FF');
    gradient.addColorStop(1, '#E0FFFF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 500);
    
    // Card border
    ctx.strokeStyle = '#9370DB';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 380, 480);
    
    // Title
    ctx.fillStyle = '#9370DB';
    ctx.font = 'bold 28px Dancing Script, cursive';
    ctx.textAlign = 'center';
    ctx.fillText("How Well Do You Know", 200, 80);
    ctx.fillText("Tejaswi?", 200, 115);
    
    // Divider
    ctx.strokeStyle = '#FFB6C1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 140);
    ctx.lineTo(350, 140);
    ctx.stroke();
    
    // Score circle
    ctx.beginPath();
    ctx.arc(200, 230, 70, 0, 2 * Math.PI);
    const scoreGradient = ctx.createLinearGradient(130, 160, 270, 300);
    scoreGradient.addColorStop(0, '#B0E0E6');
    scoreGradient.addColorStop(0.5, '#9370DB');
    scoreGradient.addColorStop(1, '#FFB6C1');
    ctx.fillStyle = scoreGradient;
    ctx.fill();
    
    // Score text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px Poppins, sans-serif';
    ctx.fillText(score, 200, 245);
    ctx.fillStyle = '#9370DB';
    ctx.font = 'bold 24px Poppins, sans-serif';
    ctx.fillText('/' + total, 200, 275);
    
    // Player name
    ctx.fillStyle = '#4A4A4A';
    ctx.font = '24px Poppins, sans-serif';
    ctx.fillText(userName, 200, 340);
    
    // Message
    ctx.fillStyle = '#9370DB';
    ctx.font = '20px Poppins, sans-serif';
    ctx.fillText(getMessage(), 200, 380);
    
    // Footer
    ctx.fillStyle = '#7B7B7B';
    ctx.font = '12px Poppins, sans-serif';
    ctx.fillText("Tejaswi's Quiz", 200, 450);
    
    setDownloaded(true);
  };

  const downloadCard = () => {
    if (!downloaded) generateCard();
    
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `${userName}-tejaswi-quiz-result.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="share-overlay" onClick={onClose}>
      <div className="share-modal" onClick={e => e.stopPropagation()}>
        <h2>📸 Share Your Result</h2>
        <canvas ref={canvasRef} width={400} height={500} style={{ display: 'none' }} />
        
        <div className="share-preview">
          <div className="preview-card">
            <h3>How Well Do You Know</h3>
            <h4>Tejaswi?</h4>
            <div className="preview-score">
              <span className="score-num">{score}</span>
              <span className="score-total">/{total}</span>
            </div>
            <p className="preview-name">{userName}</p>
            <p className="preview-msg">{getMessage()}</p>
          </div>
        </div>

        <div className="share-buttons">
          <button className="share-btn download" onClick={downloadCard}>
            📥 Download Card
          </button>
          <button className="share-btn close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareCard;
