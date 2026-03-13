import React, { useEffect, useState } from "react";

function Confetti() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const colors = ['#FFB6C1', '#9370DB', '#B0E0E6', '#FFA07A', '#E6E6FA', '#FFE4B5'];
    const newParticles = [];
    
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 10
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="confetti-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size}px`
          }}
        />
      ))}
    </div>
  );
}

export default Confetti;
