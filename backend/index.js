// backend/index.js
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const { questions, leaderboard } = require("./data");
const Score = require('./models/Score');
const connectDB = require('./db');
const scoresRouter = require('./routes/scores');

// Connect to database
connectDB()
  .then(() => console.log('🎯 Connected to database'))
  .catch(err => console.error('❌ Database connection error:', err));

// ...existing code...


app.use(cors());
app.use(express.json());

app.use('/api/scores', scoresRouter);

// Get quiz questions (without answers)
app.get("/api/questions", (req, res) => {
  const quiz = questions.map(({ answer, ...q }) => q);
  res.json(quiz);
});

// Submit quiz + save score
// ...existing code...

// ...existing code...

app.post("/api/submit", async (req, res) => {
  try {
    const { name, score } = req.body;
    
    if (!name || score === undefined) {
      return res.status(400).json({ error: 'Name and score are required' });
    }

    const newScore = new Score({
      name,
      score,
      time: new Date()
    });

    await newScore.save();
    console.log('Score saved:', { name, score });
    res.json({ success: true, score: newScore });
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

// ...existing code...

// ...existing code...
  
  app.get("/api/leaderboard", async (req, res) => {
    try {
      const scores = await Score.find().sort({ score: -1 }).limit(10);
      res.json(scores);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});



