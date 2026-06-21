import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { saveScore } from "../utils/storage";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const triviaQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
];

function GameTrivia() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (gameOver) {
      saveScore("trivia", score);
    }
  }, [gameOver, score]);

  const handleAnswer = async (selectedOption: string) => {
    setProcessing(true);
    if (selectedOption === triviaQuestions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }
    const next = currentQuestion + 1;
    if (next >= triviaQuestions.length) {
      setGameOver(true);
    } else {
      setCurrentQuestion(next);
    }
    // Simulate brief processing delay
    await new Promise((res) => setTimeout(res, 300));
    setProcessing(false);
  };

  const questionList = useMemo(
    () =>
      triviaQuestions.map((q, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{q.question}</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {q.options.map((option, i) => (
              <Button key={i} variant="default" onClick={() => handleAnswer(option)} disabled={processing}>
                {option}
              </Button>
            ))}
          </div>
        </div>
      )),
    [currentQuestion, processing],
  );

  if (gameOver) {
    return (
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
        <p className="mb-4">Final Score: {score}</p>
        <Button variant="default" onClick={() => (window.location.href = "/games")}>
          Play Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Trivia Night</h1>
      {processing && <LoadingSpinner size="sm" />}
      {questionList[currentQuestion]}
      <p className="text-gray-600">Score: {score}</p>
    </div>
  );
}

export default GameTrivia;