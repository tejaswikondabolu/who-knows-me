// frontend/src/Result.js
import React from "react";

function Result({ score, total }) {
  return (
    <div>
      <h2>Your Score: {score} / {total}</h2>
      {score === total ? (
        <p>🔥 You know Tejaswi really well!</p>
      ) : score >= total / 2 ? (
        <p>😄 Not bad! You know Tejaswi somewhat well.</p>
      ) : (
        <p>😅 You need to spend more time with Tejaswi!</p>
      )}
    </div>
  );
}

export default Result;
