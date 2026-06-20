import React, { useState } from 'react';
import { CharacterCreator } from '@/components/game/character-creator';
import { StoryInterface } from '@/components/game/story-interface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { SkipLink } from '@/components/accessibility/SkipLink';

const Index = () => {
  const [character, setCharacter] = useState<null | {
    name: string;
    className: string;
    traits: any;
    darkFantasyTraits: string[];
  }>(null);
  const [hasCreated, setHasCreated] = useState(false);

  const handleCharacterCreated = (createdCharacter: any) => {
    setCharacter(createdCharacter);
    setHasCreated(true);
  };

  // After a character is created, show the story interface
  if (hasCreated && character) {
    return (
      <div className="min-h-screen bg-darkFantasy-primary text-white flex items-center justify-center">
        <Card className="w-full max-w-2xl bg-darkFantasy-secondary rounded-xl shadow-xl p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-gothic text-darkFantasy-highlight text-center">
              Tale of the Shadowbound
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose dark:prose-invert text-darkFantasy-secondary">
              {character?.name && <p className="text-lg mb-2">Welcome, {character.name}!</p>}
              <StoryInterface />
            </CardContent>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Initial view – show the title and character creator only once
  return (
    <div className="min-h-screen bg-darkFantasy-primary text-white flex items-center justify-center">
      <Card className="w-full max-w-3xl bg-darkFantasy-secondary rounded-xl shadow-xl p-6">
        <CardHeader>
          <CardTitle className="text-4xl font-gothic text-darkFantasy-highlight text-center">
            Dark Fantasy: Rise of the Shadowbound
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;