// FunQA.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import "./FunQA.css"; // Assuming you have a CSS file for styling
  const funQuestions = [
{
  id: 1,
  question: "✨ Which color would Tejaswi’s aura glow in?",
  type: "color",
  options: [
    { 
      value: "Crimson Flame", 
      hex: "#DC143C",
      description: "Bold, fearless, and passionate with unshakable energy 🔥"
    },
    { 
      value: "Royal Sapphire", 
      hex: "#0F52BA",
      description: "Sharp, intelligent, and carrying a quiet authority 👑"
    },
    { 
      value: "Mystic Violet", 
      hex: "#8A2BE2",
      description: "Creative, mysterious, and glowing with imagination ✨"
    },
    { 
      value: "Emerald Mist", 
      hex: "#50C878",
      description: "Fresh, balanced, and connected with life’s rhythm 🌿"
    },
    { 
      value: "Amber Gold", 
      hex: "#FFBF00",
      description: "Radiant, warm, and impossible to overlook ☀️"
    }
  ]
},


  
  {
    id: 2,
    question: "🎵 Which song reminds you of Tejaswi?",
    type: "text",
    options: [
    "🌌 Die For You – The Weeknd (intense, emotional, unforgettable)",
    "🌸 Enchanted – Taylor Swift (magical, dreamy, feels like a fairytale)",
    "🔥 Unstoppable – Sia (fearless energy, nothing can break her)",
    "💫 Lovely – Billie Eilish (hauntingly beautiful, soft yet powerful)",
    "✨ Levitating – Dua Lipa (fun, bright, and full of sparkle)"
    ]
  },
  {
    id: 3,
    question: "📸 If Tejaswi were a photo aesthetic, which one would she be?",
    type: "image",
    options: [
      { value: "Nature Girl", image: "images/aesthetic_nature.jpg" },
      { value: "Retro Vibes", image: "images/aesthetic_retro.jpg" },
      { value: "Bookworm Bliss", image: "images/aesthetic_books.jpg" },
      { value: "Dreamy Pastel", image: "images/aesthetic_pastel.jpg" }
    ]
  },
  {
    id: 4,
    question: "🍩 If Tejaswi was a dessert, what would she be?",
    type: "text",
    options: [
    "Tiramisu (soft layers with a classy twist)",
    "Cheesecake (sweet, comforting, and everyone’s fave)",
    "Macaron (colorful, delicate, and a little fancy)",
    "Brownie (warm, rich, and impossible to resist)",
    "Rasgulla 💖 (light, sweet, and full of joy)"
    ]
  },
  {
    id: 5,
    question: "🧚‍♀️ If Tejaswi had magical powers, what would they be?",
    type: "text",
    options: [
    "Time Travel ⏳ (rewind or skip to the best moments)",
    "Shapeshifting 🦋 (be whoever, whenever)",
    "Invisibility 👀 (sneaky but fun)",
    "Aura Glow 🌈 (make everyone around feel calm & happy)",
    "Dream Walking 🌙 (step into people’s dreams like a fairy)"
    ]
  }
];

function FunQA({ userName }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQ] = option;
    setSelectedAnswers(updatedAnswers);
  };

  const nextQuestion = () => {
    if (currentQ < funQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Save fun answers to localStorage
      const funData = JSON.parse(localStorage.getItem('funQuizData') || '[]');
      funData.push({
        name: userName,
        answers: selectedAnswers,
        time: new Date().toISOString()
      });
      localStorage.setItem('funQuizData', JSON.stringify(funData));
      
      navigate("/fun-result");
    }
  };

  const prevQuestion = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  };

  const renderOptions = (question) => {
    switch (question.type) {
      case "color":
        return (
          <div className="color-options">
            {question.options.map((opt, idx) => (
              <div key={idx} className="color-option-container">
                <button
                  className={`color-button ${selectedAnswers[currentQ] === opt.value ? "selected" : ""}`}
                  onClick={() => handleOptionClick(opt.value)}
                  style={{
                    backgroundColor: opt.hex,
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    margin: "10px",
                    border: selectedAnswers[currentQ] === opt.value ? "4px solid #5D3FD3" : "2px solid #ccc"
                  }}
                >
                  <span className="color-name">{opt.value}</span>
                </button>
                <p className="color-description">{opt.description}</p>
              </div>
            ))}
          </div>
        );
      case "image":
        return (
          <div className="image-options">
            {question.options.map((opt, idx) => (
              <div
                key={idx}
                className={`image-option ${selectedAnswers[currentQ] === opt.value ? "selected" : ""}`}
                onClick={() => handleOptionClick(opt.value)}
              >
                <img src={opt.image} alt={opt.value} className="option-image" />
                <div className="image-caption">
                  <span>{opt.value}</span>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="text-options">
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                // className={`fun-button small ${selectedAnswers[currentQ] === opt ? "selected" : ""}`}
                className={selectedAnswers[currentQ] === opt ? "selected" : ""}
                onClick={() => handleOptionClick(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="page funqa-page">
      <h2>✨ Fun Q {currentQ + 1} of {funQuestions.length}</h2>
      <h3>{funQuestions[currentQ].question}</h3>

      {renderOptions(funQuestions[currentQ])}

      <div className="nav-buttons">
        <button onClick={prevQuestion} disabled={currentQ === 0}>⬅️ Back</button>
        <button onClick={nextQuestion}>{currentQ === funQuestions.length - 1 ? "🎈 Done!" : "➡️ Next"}</button>
      </div>
    </div>
  );
}

export default FunQA;