import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizSetup = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('9');
  const [difficulty, setDifficulty] = useState('easy');
  const [numQuestions, setNumQuestions] = useState(5);
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz', { state: { name, category, difficulty, numQuestions } });
  };

  return (
    <div>
      <h2>Set up your quiz</h2>
      <form onSubmit={e => e.preventDefault()}>
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>
          Category:
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="9">General Knowledge</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
          </select>
        </label>
        <label>
          Difficulty:
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label>
          Number of Questions:
          <input type="number" value={numQuestions} onChange={e => setNumQuestions(e.target.value)} min="1" required />
        </label>
        <button onClick={startQuiz}>Start Quiz</button>
      </form>
    </div>
  );
};

export default QuizSetup;
