const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// Get all scores (leaderboard)
router.get('/', async (req, res) => {
    try {
        const scores = await Score.find()
            .sort({ score: -1 })
            .limit(10);
        res.json(scores);
    } catch (error) {
        console.error('Get leaderboard error:', error);
        res.status(500).json({ message: "Couldn't fetch leaderboard", error: error.message });
    }
});

// Save new score
router.post('/', async (req, res) => {
    try {
        const { name, score } = req.body;
        const newScore = new Score({ name, score });
        const savedScore = await newScore.save();
        res.json(savedScore);
    } catch (error) {
        console.error('Save score error:', error);
        res.status(500).json({ message: "Couldn't save score", error: error.message });
    }
});

module.exports = router;