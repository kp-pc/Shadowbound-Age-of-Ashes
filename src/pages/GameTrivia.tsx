import React, { useState, useEffect } from 'react';
import { Card, Button } from 'shadcn/ui';
import { saveScore } from '../utils/storage';

const triviaQuestions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    answer: 'Paris'
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    answer: 'Mars'
  }
];

function GameTrivia() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Save score when game ends
    if (gameOver) {
      saveScore('trivia', score);
    }
  }, [gameOver, score]);

  const handleAnswer = (selectedOption: string) => {
    if (selectedOption === triviaQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    
    setCurrentQuestion(currentQuestion + 1);
    
    if (currentQuestion + 1 >= triviaQuestions.length) {
      setGameOver(true);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Trivia Night</h1>
      {currentQuestion < triviaQuestions.length && !gameOver ? (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{triviaQuestions[currentQuestion].question}</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {triviaQuestions[currentQuestion].options.map((option, idx) => (
              <Button
                key={idx}
                color="blue"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
          <p className="text-gray-600">Score: {score}</p>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
          <p>Final Score: {score}</p>
          <Button color="blue" onClick={() => window.location.href = "/games"}>
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
}

export default GameTrivia;