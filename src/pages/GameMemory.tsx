import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { saveScore } from '../utils/storage';

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function GameMemory() {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const cardPairs = ['♥', '♦', '♧', '♨', '♩', '♪', '♫', '♬'].map(s => [s, s]);
    const allCards = cardPairs.flat();
    setCards(shuffle(allCards));
  }, []);

  const handleFlip = (index: number) => {
    if (gameOver || flipped[index]) return;

    setFlipped(prev => ({ ...prev, [index]: true }));

    const flippedIndices = Object.keys(flipped)
      .filter(i => flipped[i])
      .map(i => parseInt(i));

    if (flippedIndices.length === 2) {
      const [first, second] = flippedIndices;
      if (cards[first] === cards[second]) {
        setScore(prev => prev + 1);
        setFlipped(prev => ({ ...prev, [first]: false, [second]: false }));
      } else {
        setTimeout(() => {
          setFlipped(prev => ({ ...prev, [first]: false, [second]: false }));
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (gameOver) {
      saveScore('memory', score);
    }
  }, [gameOver, score]);

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Memory Match</h1>
      {gameOver ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
          <p>Final Score: {score}</p>
          <Button variant="default" onClick={() => (window.location.href = '/games')}>
            Play Again
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 mb-6">
          {cards.map((card, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex items-center justify-center h-16 bg-white rounded-t p-0">
                <div className="flex items-center justify-center h-full w-full text-center text-gray-600">
                  {flipped[index] ? card : <span className="text-4xl font-bold">{card}</span>}
                </div>
              </CardHeader>
              <CardContent className="p-4 rounded-b">
                <p className="text-sm text-gray-500">Card {index + 1}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <p className="text-gray-600">Score: {score}</p>
    </div>
  );
}

export default GameMemory;