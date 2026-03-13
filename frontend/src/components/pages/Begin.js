import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Begin({ setUserName }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim() === "") {
      alert("Please enter your name 🤓");
      return;
    }
    setUserName(name);
    navigate("/quiz");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleStart();
    }
  };

  return (
    <div className="page begin-page">
      <div className="welcome-card">
        <div className="sparkles-container">
          <span className="sparkle">✨</span>
          <span className="sparkle">⭐</span>
          <span className="sparkle">✨</span>
        </div>
        
        <h1 className="welcome-title">Welcome to</h1>
        <h2 className="quiz-title">Teja's Quiz</h2>
        
        <div className="welcome-content">
          <p className="welcome-text">Ready to test how well you know Teja? 🎯</p>
          
          <div className="input-container">
            <input
              type="text"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="name-input"
              maxLength="20"
            />
            <label className="floating-label">Enter your name</label>
          </div>

          <button 
            className="start-button"
            onClick={handleStart}
            disabled={!name.trim()}
          >
            <span className="button-text">Start Quiz</span>
            <span className="button-icon">🚀</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Begin;