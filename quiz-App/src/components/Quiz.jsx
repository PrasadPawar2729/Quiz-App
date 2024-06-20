import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, category, difficulty, numQuestions } = location.state;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.get(`https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`);
      setQuestions(res.data.results);
    };
    fetchQuestions();
  }, [category, difficulty, numQuestions]);

  useEffect(() => {
    if (questions.length > 0) {
      const difficultyTimer = {
        easy: 30,
        medium: 20,
        hard: 10
      };
      setTimer(difficultyTimer[difficulty]);
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            handleNextQuestion();
            return difficultyTimer[difficulty];
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentQuestionIndex, difficulty, questions]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setFeedback('Correct!');
    } else {
      setFeedback('Incorrect!');
    }
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      handleNextQuestion();
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/results', { state: { score, totalQuestions: questions.length } });
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();

  return (
    <div>
      <h2>Quiz</h2>
      <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
      <p>{currentQuestion.question}</p>
      {answers.map(answer => (
        <button key={answer} onClick={() => handleAnswer(answer === currentQuestion.correct_answer)}>{answer}</button>
      ))}
      <p>Timer: {timer}s</p>
      {showFeedback && <p>{feedback}</p>}
      {currentQuestionIndex < questions.length - 1 ? (
        <button onClick={handleNextQuestion}>Next</button>
      ) : (
        <button onClick={() => navigate('/results', { state: { score, totalQuestions: questions.length } })}>Submit</button>
      )}
    </div>
  );
};

export default Quiz;
