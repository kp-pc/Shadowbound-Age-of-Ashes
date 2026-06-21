"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { saveScore } from "../utils/storage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { loadCharacter } from "@/utils/characterStorage";
import { Grid, Trophy, Sparkles } from "lucide-react";
import { toast } from "sonner";

function shuffle(array: any[]) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Ancient runes for dark fantasy theme
const RUNES = ["🔮", "💀", "🩸", "🕯️", "🗝️", "📜", "🛡️", "⚔️"];

function GameMemory() {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [matched, setMatched] = useState<Record<number, boolean>>({});
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const character = loadCharacter();

  useEffect(() => {
    const init = async () => {
      const cardPairs = RUNES.map((s) => [s, s]);
      const allCards = shuffle(cardPairs.flat());
      setCards(allCards);
      setLoading(false);
    };
    init();
  }, []);

  const handleFlip = (index: number) => {
    if (gameOver || matched[index] || flipped[index] || selectedIndices.length >= 2) return;

    // Flip the card
    setFlipped((prev) => ({ ...prev, [index]: true }));
    const newSelected = [...selectedIndices, index];
    setSelectedIndices(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (cards[first] === cards[second]) {
        // Match found
        setScore((prev) => prev + 15);
        setMatched((prev) => ({ ...prev, [first]: true, [second]: true }));
        setSelectedIndices([]);
        toast.success("A perfect match! The runes glow.");
      } else {
        // No match
        setTimeout(() => {
          setFlipped((prev) => ({ ...prev, [first]: false, [second]: false }));
          setSelectedIndices([]);
        }, 1000);
      }
    }
  };

  // Check for game over
  useEffect(() => {
    if (cards.length > 0 && Object.keys(matched).length === cards.length) {
      setGameOver(true);
    }
  }, [matched, cards]);

  useEffect(() => {
    if (gameOver) {
      const key = character ? `${character.name}:memory` : "memory";
      saveScore(key, score);
    }
  }, [gameOver, score, character]);

  const renderedCards = useMemo(
    () =>
      cards.map((card, index) => {
        const isFlipped = flipped[index] || matched[index];
        return (
          <Card
            key={index}
            className={`
              cursor-pointer transition-all duration-500 transform preserve-3d relative h-24 md:h-28
              ${isFlipped ? "rotate-y-180" : ""}
              ${matched[index] ? "border-green-500/50 bg-green-950/20" : "border-darkFantasy-border bg-darkFantasy-primary hover:border-darkFantasy-accent"}
            `}
            onClick={() => handleFlip(index)}
          >
            <div className="absolute inset-0 flex items-center justify-center text-center p-2">
              {isFlipped ? (
                <span className="text-3xl md:text-4xl animate-pulse">{card}</span>
              ) : (
                <div className="w-8 h-8 rounded-full bg-darkFantasy-secondary/50 border border-darkFantasy-border flex items-center justify-center text-darkFantasy-highlight font-gothic">
                  ?
                </div>
              )}
            </div>
          </Card>
        );
      }),
    [cards, flipped, matched, selectedIndices],
  );

  if (loading) return <LoadingSpinner size="lg" />;

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
              You have successfully matched all the ancient runes. Your final score has been recorded.
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

  return (
    <div className="max-w-2xl mx-auto p-4 animate-fade-in-up space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-darkFantasy-border pb-4">
        <div className="flex items-center gap-2">
          <Grid className="text-darkFantasy-highlight w-5 h-5" />
          <h1 className="text-2xl font-gothic text-darkFantasy-highlight">Memory Match</h1>
        </div>
        <div className="text-sm text-darkFantasy-accent">
          Score: <strong className="text-white text-lg">{score}</strong>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-4 gap-3 md:gap-4">
        {renderedCards}
      </div>

      <p className="text-center text-xs text-darkFantasy-accent italic">
        Match the ancient runes to clear the board and earn points.
      </p>
    </div>
  );
}

export default GameMemory;