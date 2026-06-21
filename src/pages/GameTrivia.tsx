"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveScore } from "../utils/storage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { loadCharacter } from "@/utils/characterStorage";
import { Brain, Trophy, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

const triviaQuestions = [
  {
    question: "Which forbidden school of magic manipulates the life force of others?",
    options: ["Necromancy", "Pyromancy", "Chronomancy", "Illusion"],
    answer: "Necromancy",
  },
  {
    question: "What celestial event weakens the barrier between the mortal realm and the void?",
    options: ["Solar Eclipse", "Blood Moon", "Meteor Shower", "Vernal Equinox"],
    answer: "Blood Moon",
  },
  {
    question: "Which ancient artifact is said to contain the soul of the first Shadow King?",
    options: ["The Obsidian Crown", "The Void Scepter", "The Bloodstone Ring", "The Shadow Grimoire"],
    answer: "The Obsidian Crown",
  },
];

function GameTrivia() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const character = loadCharacter();

  useEffect(() => {
    if (gameOver) {
      const key = character ? `${character.name}:trivia` : "trivia";
      saveScore(key, score);
    }
  }, [gameOver, score, character]);

  const handleAnswer = async (selectedOption: string) => {
    if (selectedAnswer) return; // Prevent double clicking
    setSelectedAnswer(selectedOption);
    setProcessing(true);

    const isCorrect = selectedOption === triviaQuestions[currentQuestion].answer;
    if (isCorrect) {
      setScore((prev) => prev + 10);
      toast.success("Correct! The shadows recede.");
    } else {
      toast.error("Incorrect! The darkness deepens.");
    }

    await new Promise((res) => setTimeout(res, 1200));

    const next = currentQuestion + 1;
    if (next >= triviaQuestions.length) {
      setGameOver(true);
    } else {
      setCurrentQuestion(next);
      setSelectedAnswer(null);
    }
    setProcessing(false);
  };

  if (gameOver) {
    return (
      <div className="max-w-md mx-auto p-4 animate-fade-in-up">
        <Card className="bg-darkFantasy-primary border-darkFantasy-border text-center p-6">
          <CardHeader>
            <div className="w-16 h-16 bg-darkFantasy-accent/30 rounded-full flex items-center justify-center mx-auto mb-4 text-darkFantasy-highlight border border-darkFantasy-highlight/30">
              <Trophy className="w-8 h-8" />
            </div>
            <CardTitle className="text-3xl font-gothic text-darkFantasy-highlight">Trial Concluded</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-darkFantasy-accent">
              You have faced the questions of the void. Your final score has been recorded.
            </p>
            <div className="bg-darkFantasy-secondary/40 p-4 rounded-lg border border-darkFantasy-border">
              <span className="text-xs text-darkFantasy-accent uppercase tracking-wider block">Final Score</span>
              <span className="text-4xl font-bold text-white">{score} pts</span>
            </div>
            <Button
              className="w-full bg-darkFantasy-accent hover:bg-darkFantasy-highlight text-white font-gothic py-3"
              onClick={() => (window.location.href = "/games")}
            >
              Return to Trials
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = triviaQuestions[currentQuestion];

  return (
    <div className="max-w-xl mx-auto p-4 animate-fade-in-up">
      <Card className="bg-darkFantasy-primary border-darkFantasy-border overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>
        <CardHeader className="border-b border-darkFantasy-border/50 bg-darkFantasy-secondary/20 flex flex-row items-center justify-between p-6">
          <div className="flex items-center gap-2">
            <Brain className="text-darkFantasy-highlight w-5 h-5" />
            <CardTitle className="text-xl font-gothic text-darkFantasy-highlight">Trivia Trial</CardTitle>
          </div>
          <span className="text-xs text-darkFantasy-accent font-bold uppercase tracking-wider">
            Question {currentQuestion + 1} of {triviaQuestions.length}
          </span>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Question */}
          <h2 className="text-xl md:text-2xl font-gothic text-white leading-relaxed">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((option, i) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQ.answer;
              const showResult = selectedAnswer !== null;

              return (
                <Button
                  key={i}
                  onClick={() => handleAnswer(option)}
                  disabled={processing}
                  className={`
                    w-full justify-start text-left py-4 px-4 h-auto font-gothic border transition-all duration-300
                    ${showResult
                      ? isCorrect
                        ? "bg-green-900/40 border-green-500 text-green-200"
                        : isSelected
                          ? "bg-red-900/40 border-red-500 text-red-200"
                          : "bg-darkFantasy-secondary/20 border-darkFantasy-border text-darkFantasy-accent"
                      : "bg-darkFantasy-secondary/40 hover:bg-darkFantasy-secondary border-darkFantasy-border text-darkFantasy-highlight hover:border-darkFantasy-accent"
                    }
                  `}
                >
                  <span className="mr-3 opacity-50">{String.fromCharCode(65 + i)}.</span>
                  {option}
                </Button>
              );
            })}
          </div>

          {/* Score & Progress */}
          <div className="flex justify-between items-center border-t border-darkFantasy-border/50 pt-4 text-sm">
            <span className="text-darkFantasy-accent">Current Score: <strong className="text-white">{score}</strong></span>
            {processing && (
              <span className="text-darkFantasy-highlight flex items-center gap-2">
                <LoadingSpinner size="sm" /> Consulting the void...
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default GameTrivia;