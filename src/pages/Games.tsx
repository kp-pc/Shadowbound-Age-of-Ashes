import React from 'react';
import { Card, Button } from 'shadcn/ui';
import { Link } from 'react-router-dom';

function Games() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Available Games</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 rounded-lg shadow-md">
          <Card.Header>
            <Card.Title as="h3" className="font-semibold">
              Trivia Night
            </Card.Title>
          </Card.Header>
          <Card.Description>
            Test your knowledge with fun trivia questions
          </Card.Description>
          <Card.Actions>
            <Button as={Link} to="/games/trivia" className="w-full">
              Play Now
            </Button>
          </Card.Actions>
        </Card>
        
        <Card className="p-4 rounded-lg shadow-md">
          <Card.Header>
            <Card.Title as="h3" className="font-semibold">
              Memory Match
            </Card.Title>
          </Card.Header>
          <Card.Description>
            Classic card-matching game to train your memory
          </Card.Description>
          <Card.Actions>
            <Button as={Link} to="/games/memory" className="w-full">
              Play Now
            </Button>
          </Card.Actions>
        </Card>
      </div>
    </div>
  );
}

export default Games;