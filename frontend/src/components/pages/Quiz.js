// Quiz.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { playClickSound, playSuccessSound } from "../../utils/sounds";

const questions = [
    {
      id: 1,
      question: "What is Teja's favorite color?",
      type: "color",
      options: [
        { value: "Lime", hex: "#C0FF00" },
        { value: "Lavender", hex: "#D3D3FF" },
        { value: "Moccasin", hex: "#FFE4B5" },
        { value: "Peach", hex: "#F7A399" },
        { value: "Arctic Blue", hex: "#B0E0E6" }
      ],
      answer: "Lavender"
    },
    {
      id: 2,
      question: "🏞️ Which place is Teja's favorite? (Though she never visited any)",
      type: "image",
      options: [
        { value: "Rome, Italy 🏛️", image: "images/rome.jpg" },
        { value: "Paris, France 🗼", image: "images/pariss.jpg" },
        { value: "Singapore 🌃", image: "images/Singapore1.jpg" },
        { value: "Valley of Flowers, Uttarakhand 🌸", image: "images/img1.jpg" },
        { value: "Mussoorie, Uttarakhand 🌲", image: "images/mussorie.jpg" },
        { value: "Munnar, Kerala 🌿", image: "images/img3.jpeg" }
      ],
      answer: "Valley of Flowers, Uttarakhand 🌸"
    },
    {
      id: 3,
      question: "🍱 What is Teja's favorite cuisine?",
      type: "image",
      options: [
        { value: "Indian", image: "images/indian.jpg" },
        { value: "Mexican", image: "images/mexican.jpeg" },
        { value: "Italian", image: "images/italian.jpg" },
        { value: "Chinese", image: "images/chinese.jpg" }
      ],
      answer: "Chinese"
    },
    {
      id: 4,
      question: "📺 What's Teja's favorite all-time cartoon?",
      type: "image",
      options: [
        { value: "Shinchan", image: "images/shinchan.jpeg" },
        { value: "Jake and the Never Land Pirates", image: "images/jake.jpg" },
        { value: "Doraemon", image: "images/doraemon.jpeg" },
        { value: "WordWorld", image: "images/wordworld.jpeg" }
      ],
      answer: "Doraemon"
    },
    {
      id: 5,
      question: "🍲 Which dish does Teja love the most?",
      type: "image",
      options: [
        { value: "Korean Bibimbap", image: "images/bibimbap.jpg" },
        { value: "Chicken Biryani", image: "images/chicken-biryani.jpg" },
        { value: "Lasagna", image: "images/lasagna.jpg" },
        { value: "Paneer Butter Masala", image: "images/paneer.jpg" },
        { value: "Japanese Tteokbokki", image: "images/tkeo.jpg" },
        { value: "Hainanese Chicken Rice", image: "images/hainan.jpg" }
      ],
      answer: "Paneer Butter Masala"
    },
    {
      id: 6,
      question: "🎬 What's Teja's favorite movie?",
      type: "image",
      options: [
        { value: "Angels and Demons", image: "images/angels.jpg" },
        { value: "The Da Vinci Code", image: "images/davinci.jpg" },
        { value: "Inferno", image: "images/inferno.jpg" },
        { value: "Interstellar", image: "images/interstellar.jpg" }
      ],
      answer: "The Da Vinci Code"
    },
    {
      id: 7,
      question: "💖 What's Teja's favorite love story?",
      type: "image",
      options: [
        { value: "MS Dhoni", image: "images/msdhoni.jpg" },
        { value: "Seetha Ramam", image: "images/sitharamam.jpg" },
        { value: "Sanam Teri Kasam", image: "images/sanam.jpg" },
        { value: "Ninnu Kori", image: "images/ninnukori.jpeg" }
      ],
      answer: "Sanam Teri Kasam"
    },
    {
      id: 8,
      question: "🙅‍♀️ Which animal does Teja hate the most?",
      type: "image",
      options: [
        { value: "Snake", image: "images/snake.jpg" },
        { value: "Lizard", image: "images/lizard.jpg" },
        { value: "Cockroach", image: "images/cockroach.jpg" },
        { value: "Rats", image: "images/rat.jpg" }
      ],
      answer: "Lizard"
    },
    {
      id: 9,
      question: "🚫 What is something Teja would never tolerate?",
      type: "text",
      options: ["Dishonesty", "Disrespect", "Betrayal", "Laziness"],
      answer: "Disrespect"
    },
    {
      id: 10,
      question: "📚 What is Teja's favorite book?",
      type: "image",
      options: [
        { value: "The American Roommate Experiment", image: "images/american.jpg" },
        { value: "A Girl Who Knew Too Much", image: "images/girl.jpg" },
        { value: "The Silent Patient", image: "images/silent.jpg" },
        { value: "Verity", image: "images/verity.jpg" }
      ],
      answer: "Verity"
    },
    {
      id: 11,
      question: "🌧️ What's Teja's favorite type of weather?",
      type: "image",
      options: [
        { value: "Sunny ☀️", image: "images/sunny.jpg" },
        { value: "Rainy 🌧️", image: "images/rainy.jpeg" },
        { value: "Windy 💨", image: "images/windy.jpg" },
        { value: "Cloudy ☁️", image: "images/cloudy.jpg" }
      ],
      answer: "Rainy 🌧️"
    },
    {
      id: 12,
      question: "🍜 What would Teja pick first?",
      type: "image",
      options: [
        { value: "Noodles 🍜", image: "images/noodles.jpg" },
        { value: "Pani Puri 🫓", image: "images/panipuri.jpg" },
        { value: "Chocolate Brownie 🍰", image: "images/chocolate.jpg" },
        { value: "Ice Cream 🍨", image: "images/icecream.png" }
      ],
      answer: "Ice Cream 🍨"
    },
    {
      id: 13,
      question: "🎵 What's Teja's favorite type of music?",
      type: "image",
      options: [
        { value: "Classical 🎻", image: "images/classical.jpg" },
        { value: "Sufi 🎹", image: "images/sufi.jpg" },
        { value: "Filmi 🎬", image: "images/filmi.png" },
        { value: "Hip-hop/Rap 🎤", image: "images/hip-hop.jpg" }
      ],
      answer: "Classical 🎻"
    },
    {
      id: 14,
      question: "What's Teja's favorite ice cream flavor?",
      type: "text",
      options: ["Vanilla", "Strawberry", "Chocolate", "Mint"],
      answer: "Chocolate"
    },
    {
      id: 15,
      question: "🎬 What's Teja's favorite movie genre?",
      type: "text",
      options: ["Comedy", "Romance", "Thrillers/Murders", "Action"],
      answer: "Thrillers/Murders"
    },
    {
      id: 16,
      question: "🏔️ What's Teja's favorite type of vacation?",
      type: "image",
      options: [
        { value: "Beach 🏖️", image: "images/beach.jpg" },
        { value: "Hill Station ⛰️", image: "images/hillstation.jpg" },
        { value: "Cultural Visit 🏛️", image: "images/cultural.jpg" },
        { value: "Food Trip 🍜", image: "images/foodtrip.jpg" }
      ],
      answer: "Hill Station ⛰️"
    },
    {
      id: 17,
      question: "🎨 What color does Teja wear the most?",
      type: "text",
      options: ["Pink", "Black", "Blue Pastels", "White"],
      answer: "Black"
    },
    {
      id: 18,
      question: "🗣️ What's Teja's most random thing she says often?",
      type: "text",
      options: ["Bruh", "What nonsense", "Ayyo", "Seriously??"],
      answer: "Seriously??"
    },
    {
      id: 19,
      question: "⏰ Would Teja rather come 10 mins late or 1 hr early?",
      type: "text",
      options: ["10 mins late", "1 hr early"],
      answer: "1 hr early"
    },
    {
      id: 20,
      question: "🐾 What's Teja's pet?",
      type: "text",
      options: ["Dog", "Cat", "Bird", "Fish"],
      answer: "Dog"
    },
    {
      id: 21,
      question: "What is something Teja can never say no to?",
      type: "text",
      options: ["Free food", "Sleeping", "Gossip", "Shopping"],
      answer: "Free food"
    }
  ];

  

function Quiz({ userName, setUserAnswers, setScore, setTotalQuestions }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTotalQuestions(questions.length);
  }, [setTotalQuestions]);

  const handleOptionClick = (option) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQ] = option;
    setSelectedAnswers(updatedAnswers);
    playClickSound();
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      playSuccessSound();
    } else {
      // Calculate score based on all questions
      const totalScore = selectedAnswers.reduce((score, answer, index) => {
        return answer === questions[index].answer ? score + 1 : score;
      }, 0);
  
      setUserAnswers(selectedAnswers);
      setScore(totalScore);  // This will now be out of total questions
      navigate("/result");
    }
  };

  const prevQuestion = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  };

  
    const renderOptions = (question) => {
      switch (question.type) {
        case 'color':
          return (
            <div className="color-options">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  className={`color-button ${selectedAnswers[currentQ] === opt.value ? "selected" : ""}`}
                  onClick={() => handleOptionClick(opt.value)}
                  style={{
                    backgroundColor: opt.hex,
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    margin: '10px',
                    border: selectedAnswers[currentQ] === opt.value 
                      ? '4px solid #000' 
                      : '2px solid #ccc'
                  }}
                >
                  <span className="color-name">{opt.value}</span>
                </button>
              ))}
            </div>
          );

          case 'image':
            return (
              <div className="image-options">
                {question.options.map((opt, idx) => (
                  <div 
                    key={idx}
                    className={`image-option ${
                      selectedAnswers[currentQ] === opt.value ? "selected" : ""
                    } ${
                      question.id === 10 ? "book-cover" : ""
                    }`}
                    onClick={() => handleOptionClick(opt.value)}
                  >
                    <img 
                      src={opt.image} 
                      alt={opt.value}
                      className="option-image"
                    />
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
      <div className="page">
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="progress-text">{currentQ + 1} of {questions.length}</p>
        </div>
        
        <h2>{questions[currentQ].question}</h2>
  
        {renderOptions(questions[currentQ])}
  
        <div className="nav-buttons">
          <button onClick={prevQuestion} disabled={currentQ === 0}>
            ⬅️ Back
          </button>
          <button onClick={nextQuestion} disabled={!selectedAnswers[currentQ]}>
            {currentQ === questions.length - 1 ? "🎉 Finish" : "➡️ Next"}
          </button>
        </div>
      </div>
    );
  }


export default Quiz;
