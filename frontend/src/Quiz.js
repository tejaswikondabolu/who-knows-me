// frontend/src/Quiz.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Result from "./Result";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/questions").then((res) => {
      setQuestions(res.data);
      setAnswers(new Array(res.data.length).fill(""));
    });
  }, []);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    axios.post("http://localhost:5000/api/submit", { answers })
      .then((res) => setScore(res.data.score));
  };

  if (score !== null) {
    return <Result score={score} total={questions.length} />;
  }

  return (
    <div>
      {questions.map((q, i) => (
        <div key={q.id}>
          <p><strong>{i + 1}. {q.question}</strong></p>
          {q.options.map((opt) => (
            <label key={opt} style={{ display: "block" }}>
              <input
                type="radio"
                name={`q-${i}`}
                value={opt}
                checked={answers[i] === opt}
                onChange={() => handleChange(i, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} style={{ marginTop: '20px' }}>Submit</button>
    </div>
  );
}

export default Quiz;
