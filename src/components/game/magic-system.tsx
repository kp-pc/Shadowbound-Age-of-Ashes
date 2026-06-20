import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Flame, Wind, Zap, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Spell {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  effect: string;
}

const SPELLS: Spell[] = [
  {
    id: 'shadow-bolt',
    name: 'Shadow Bolt',
    description: 'Hurl a bolt of concentrated void energy.',
    icon: <Zap className="w-5 h-5" />,
    color: 'bg-purple-600',
    effect: 'animate-pulse'
  },
  {
    id: 'blood-flame',
    name: 'Blood Flame',
    description: 'Ignite the air with crimson fire.',
    icon: <Flame className="w-5 h-5" />,
    color: 'bg-red-600',
    effect: 'animate-bounce'
  },
  {
    id: 'void-shield',
    name: 'Void Shield',
    description: 'Create a barrier of absolute darkness.',
    icon: <Shield className="w-5 h-5" />,
    color: 'bg-indigo-800',
    effect: 'animate-spin'
  },
  {
    id: 'spectral-wind',
    name: 'Spectral Wind',
    description: 'Summon a gale of ghostly whispers.',
    icon: <Wind className="w-5 h-5" />,
    color: 'bg-blue-400',
    effect: 'animate-pulse'
  }
];

export const MagicSystem: React.FC = () => {
  const [activeSpell, setActiveSpell] = useState<string | null>(null);

  const castSpell = (spellId: string) => {
    setActiveSpell(spellId);
    setTimeout(() => setActiveSpell(null), 2000);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SPELLS.map(spell => (
          <Card 
            key={spell.id} 
            className={cn(
              "cursor-pointer transition-all duration-300 border-darkFantasy-border bg-darkFantasy-secondary hover:scale-105",
              activeSpell === spell.id && "ring-4 ring-darkFantasy-highlight scale-110"
            )}
            onClick={() => castSpell(spell.id)}
          >
            <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
              <div className={cn(
                "p-3 rounded-full text-white",
                spell.color,
                activeSpell === spell.id && spell.effect
              )}>
                {spell.icon}
              </div>
              <div className="font-gothic text-darkFantasy-highlight">{spell.name}</div>
              <div className="text-xs text-darkFantasy-secondary">{spell.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {activeSpell && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
          <div className="w-64 h-64 bg-darkFantasy-highlight/20 rounded-full blur-3xl animate-ping"></div>
          <div className="absolute text-4xl font-gothic text-darkFantasy-highlight animate-bounce">
            CASTING...
          </div>
        </div>
      )}
    </div>
  );
};