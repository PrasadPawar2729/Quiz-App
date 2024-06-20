import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await axios.get('/api/leaderboard'); // Mock endpoint
      setLeaderboard(res.data);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>{entry.name} - {entry.score}</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
