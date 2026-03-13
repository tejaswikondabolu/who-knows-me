const API_URL = 'http://localhost:5000/api';

// Submit quiz score
export const submitQuiz = async (name, answers) => {
    try {
        const response = await fetch(`${API_URL}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, answers })
        });
        if (!response.ok) {
            throw new Error('Failed to submit quiz');
        }
        return await response.json();
    } catch (error) {
        console.error('Submit quiz error:', error);
        throw error;
    }
};

// Get leaderboard data
export const getLeaderboard = async () => {
    try {
        const response = await fetch(`${API_URL}/leaderboard`);
        if (!response.ok) {
            throw new Error('Failed to fetch leaderboard');
        }
        return await response.json();
    } catch (error) {
        console.error('Leaderboard error:', error);
        throw error;
    }
};