import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function Games() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Available Games</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="font-semibold">
              Trivia Night
            </CardTitle>
            <CardDescription>
              Test your knowledge with fun trivia questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/games/trivia">
                Play Now
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="p-4 rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="font-semibold">
              Memory Match
            </CardTitle>
            <CardDescription>
              Classic card-matching game to train your memory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/games/memory">
                Play Now
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Games;