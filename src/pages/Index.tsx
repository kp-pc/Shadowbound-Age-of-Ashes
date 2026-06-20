import React, { useState } from 'react';
import { CharacterCreator } from '@/components/game/character-creator';
import { StoryInterface } from '@/components/game/story-interface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { SkipLink } from '@/components/accessibility/SkipLink';

const Index = () => {
  const [characterCreated, setCharacterCreated] = useState(false);
  const [character, setCharacter] = useState<null | {
    name: string;
    className: string;
    traits: any;
    darkFantasyTraits: string[];
  }>(null);

  const handleCharacterCreated = (createdCharacter: any) => {
    setCharacter(createdCharacter);
    setCharacterCreated(true);
  };

  return (
    <div id="main-content" className="min-h-screen bg-darkFantasy-primary text-white flex flex-col items-center justify-center">
      <SkipLink />
      <Card className="w-full max-w-3xl bg-darkFantasy-secondary rounded-xl shadow-xl p-6">
        <CardHeader>
          <CardTitle className="text-4xl font-gothic text-darkFantasy-highlight text-center">
            Dark Fantasy: Rise of the Shadowbound
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {characterCreated ? (
            <>
              <div className="text-center">
                <div className="w-20 h-2 bg-darkFantasy-accent rounded-full animate-pulse"></div>
                <h2 className="text-lg text-darkFantasy-accent mb-2">Welcome, {character?.name}!</h2>
                <p className="text-darkFantasy-secondary mb-4">
                  You have chosen the path of the {character?.className.toLowerCase()}...
                </p>
                <div className="flex justify-center space-x-2 mb-6">
                  {character?.darkFantasyTraits.map(trait => (
                    <span key={trait} className="px-3 py-1 bg-darkFantasy-accent/50 rounded-full text-xs text-darkFantasy-accent font-medium">
                      {trait.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <CharacterCreator onComplete={handleCharacterCreated} />
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-darkFantasy-accent rounded-full animate-pulse"></div>
                <h1 className="text-3xl font-bold text-darkFantasy-highlight mb-2">Dark Fantasy</h1>
                <p className="text-lg text-darkFantasy-secondary">
                  Forge your destiny in a world of shadow and ancient magic
                </p>
              </div>
              <div className="space-y-4">
                <CharacterCreator onComplete={handleCharacterCreated} />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {characterCreated && character && (
        <div className="mt-8">
          <StoryInterface />
        </div>
      )}
    </div>
  );
};

export default Index;