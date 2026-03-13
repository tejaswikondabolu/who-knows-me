import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FunResult() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="page fun-result-page">
      <div className="fun-result-card">
        <div className="sparkles-container">
          <span className="sparkle">✨</span>
          <span className="sparkle">💜</span>
          <span className="sparkle">✨</span>
        </div>
        <h1 className="fun-result-title">Views Submitted!</h1>
        <p className="fun-result-text">
          Thank you for sharing your thoughts about Tejaswi!<br />
          💜✨
        </p>
        <p style={{ marginTop: "20px", color: "#A0A0A0", fontSize: "0.9rem" }}>
          Redirecting to home...
        </p>
      </div>
    </div>
  );
}

export default FunResult;
