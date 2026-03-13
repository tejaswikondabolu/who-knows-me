import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./components/pages/Intro";
import Begin from "./components/pages/Begin";
import Quiz from "./components/pages/Quiz";
import Result from "./components/pages/Result";
import Leaderboard from "./components/pages/Leaderboard";
import FunQA from "./components/pages/FunQA";
import FunResult from "./components/pages/FunResult";
import Admin from "./components/pages/Admin";
import BackgroundMusic from "./components/BackgroundMusic";

function App() {
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  return (
    <Router>
      <BackgroundMusic />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/begin" element={<Begin setUserName={setUserName} />} />
        <Route
          path="/quiz"
          element={
            <Quiz
              userName={userName}
              setScore={setScore}
              setTotalQuestions={setTotalQuestions}
            />
          }
        />
        <Route
          path="/result"
          element={<Result userName={userName} score={score} totalQuestions={totalQuestions} />}
        />
        <Route path="/fun" element={<FunQA userName={userName} />} />
        <Route path="/fun-result" element={<FunResult />} />

        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
