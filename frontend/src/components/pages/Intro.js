import React from "react";
import { useNavigate } from "react-router-dom";

function Intro() {
  const navigate = useNavigate();

  return (
    <div className="page intro-page">
      <div className="intro-card">
        <div className="sparkles-container">
          <span className="sparkle">✨</span>
          <span className="sparkle">⭐</span>
          <span className="sparkle">✨</span>
        </div>

        <h1 className="intro-title">
          How Well Do You Know
          <span className="highlight-text">Tejaswi?</span>
        </h1>

        <div className="intro-content">
          <p className="intro-text">
            Ready to prove you're a true Tejaswi Expert? 🧐
          </p>
          
          <div className="emoji-row">
            <span className="floating-emoji">💜</span>
            <span className="floating-emoji">🎯</span>
            <span className="floating-emoji">✨</span>
          </div>

          <button 
            className="start-button"
            onClick={() => navigate("/begin")}
          >
            <span className="button-text">Let's Begin!</span>
            <span className="button-icon">🚀</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Intro;