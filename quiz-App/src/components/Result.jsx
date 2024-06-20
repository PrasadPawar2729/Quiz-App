import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions } = location.state;
  const percentage = ((score / totalQuestions) * 100).toFixed(2);

  return (
    <div>
      <h2>Quiz Results</h2>
      <p>Correct Answers: {score}</p>
      <p>Incorrect Answers: {totalQuestions - score}</p>
      <p>Total Score: {score}/{totalQuestions}</p>
      <p>Percentage: {percentage}%</p>
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => navigate('/leaderboard')}>Leaderboard</button>
    </div>
  );
};

export default Results;
