import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Flame, Wind, Zap, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Spell {
  id: string;
  name: string;
  description: string;
  color: string;
}

const DEFAULT_SPELLS: Spell[] = [
  {
    id: 'shadow-bolt',
    name: 'Shadow Bolt',
    description: 'Hurl a bolt of concentrated void energy.',
    color: 'bg-purple-600'
  },
  {
    id: 'void-shield',
    name: 'Void Shield',
    description: 'Create a barrier of absolute darkness.',
    color: 'bg-indigo-800'
  }
];

const ICON_MAP: Record<string, React.ReactNode> = {
  'shadow-bolt': <Zap className="w-5 h-5" />,
  'blood-flame': <Flame className="w-5 h-5" />,
  'void-shield': <Shield className="w-5 h-5" />,
  'spectral-wind': <Wind className="w-5 h-5" />,
  'default': <Sparkles className="w-5 h-5" />
};

export const MagicSystem: React.FC = () => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [activeSpell, setActiveSpell] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const loadSpells = () => {
      const stored = localStorage.getItem('shadowboundSpells');
      if (stored) {
        setSpells(JSON.parse(stored));
      } else {
        localStorage.setItem('shadowboundSpells', JSON.stringify(DEFAULT_SPELLS));
        setSpells(DEFAULT_SPELLS);
      }
    };

    loadSpells();
    // Listen for custom events to update spells in real-time
    window.addEventListener('spellsUpdated', loadSpells);
    return () => window.removeEventListener('spellsUpdated', loadSpells);
  }, []);

  const castSpell = (spellId: string) => {
    setActiveSpell(spellId);
    setAnnouncement(`Casting ${spellId.replace('-', ' ')} spell`);
    setTimeout(() => setActiveSpell(null), 2000);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Accessibility live region for screen readers */}
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
      
      {spells.length === 0 ? (
        <p className="text-sm text-darkFantasy-accent italic text-center py-4">Your spellbook is empty.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {spells.map(spell => (
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
                  activeSpell === spell.id && "animate-pulse"
                )}>
                  {ICON_MAP[spell.id] || ICON_MAP['default']}
                </div>
                <div className="font-gothic text-darkFantasy-highlight text-sm">{spell.name}</div>
                <div className="text-[10px] text-darkFantasy-accent leading-tight">{spell.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
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