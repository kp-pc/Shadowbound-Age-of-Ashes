import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface CharacterTraits {
  strength: number;
  intelligence: number;
  agility: number;
  charisma: number;
}

interface CharacterClass {
  name: string;
  description: string;
  primaryStat: keyof CharacterTraits;
}

const CHARACTER_CLASSES: CharacterClass[] = [
  { name: 'Shadowblade', description: 'Master of stealth and daggers', primaryStat: 'agility' },
  { name: 'Arcanist', description: 'Wielder of forbidden magic', primaryStat: 'intelligence' },
  { name: 'Bloodknight', description: 'Warrior cloaked in dark armor', primaryStat: 'strength' },
  { name: 'Visperator', description: 'Charismatic manipulator of minds', primaryStat: 'charisma' }
];

const DARK_FANTASY_TRAITS = [
  { id: 'night-blood', label: 'Night-Blood Heritage', description: 'Enhanced strength under moonlight' },
  { id: 'void-sight', label: 'Void Sight', description: 'See in complete darkness' },
  { id: 'blood-mark', label: 'Blood Mark', description: 'Scarred by dark rituals' },
  { id: 'whisper-voice', label: 'Whisper Voice', description: 'Command presence over others' },
  { id: 'shadow-walk', label: 'Shadow Walk', description: 'Move through shadows unnoticed' }
];

export interface CreatedCharacter {
  name: string;
  className: string;
  traits: CharacterTraits;
  darkFantasyTraits: string[];
}

interface CharacterCreatorProps {
  onComplete: (character: CreatedCharacter) => void;
}

export const CharacterCreator: React.FC<CharacterCreatorProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState<CharacterClass | null>(null);
  const [traits, setTraits] = useState<CharacterTraits>({
    strength: 5,
    intelligence: 5,
    agility: 5,
    charisma: 5
  });
  const [selectedDarkTraits, setSelectedDarkTraits] = useState<string[]>([]);

  const handleTraitChange = (stat: keyof CharacterTraits, value: number[]) => {
    setTraits(prev => ({ ...prev, [stat]: value[0] }));
  };

  const handleDarkTraitToggle = (traitId: string) => {
    setSelectedDarkTraits(prev => 
      prev.includes(traitId)
        ? prev.filter(id => id !== traitId)
        : [...prev, traitId]
    );
  };

  const handleCreate = () => {
    if (!selectedClass || !name) return;
    onComplete({
      name,
      className: selectedClass.name,
      traits,
      darkFantasyTraits: selectedDarkTraits
    });
  };

  return (
    <div className="min-h-screen bg-darkFantasy-shadow p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-darkFantasy-primary border-darkFantasy-border">
        <CardHeader>
          <CardTitle className="text-3xl font-gothic text-darkFantasy-highlight">
            Forge Your Dark Hero
          </CardTitle>
          <CardDescription className="text-darkFantasy-secondary">
            Shape a being touched by shadow and mystery
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-darkFantasy-highlight">
              Character Name
            </Label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-darkFantasy-secondary border border-darkFantasy-border rounded-md text-white placeholder:text-darkFantasy-accent focus:outline-none focus:ring-2 focus:ring-darkFantasy-accent"
              placeholder="Enter a name whispered in fear..."
            />
          </div>

          <div className="space-y-2">
            <Label className="text-darkFantasy-highlight">Choose Your Path</Label>
            <Select onValueChange={(value) => setSelectedClass(CHARACTER_CLASSES.find(c => c.name === value) || null)}>
              <SelectTrigger className="bg-darkFantasy-secondary border-darkFantasy-border text-white">
                <SelectValue placeholder="Select a dark class" />
              </SelectTrigger>
              <SelectContent className="bg-darkFantasy-primary border-darkFantasy-border">
                {CHARACTER_CLASSES.map(cls => (
                  <SelectItem 
                    key={cls.name} 
                    value={cls.name}
                    className="focus:bg-darkFantasy-secondary text-white"
                  >
                    <div>
                      <div className="font-semibold">{cls.name}</div>
                      <div className="text-sm text-darkFantasy-accent">{cls.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label className="text-darkFantasy-highlight">Core Attributes</Label>
            {Object.entries(traits).map(([stat, value]) => (
              <div key={stat} className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-darkFantasy-secondary capitalize">{stat}</Label>
                  <span className="text-darkFantasy-highlight font-bold">{value}</span>
                </div>
                <Slider
                  value={[value]}
                  onValueChange={(v) => handleTraitChange(stat as keyof CharacterTraits, v)}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label className="text-darkFantasy-highlight">Dark Fantasy Traits</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DARK_FANTASY_TRAITS.map(trait => (
                <div key={trait.id} className="flex items-start space-x-3">
                  <Checkbox
                    id={trait.id}
                    checked={selectedDarkTraits.includes(trait.id)}
                    onCheckedChange={() => handleDarkTraitToggle(trait.id)}
                    className="border-darkFantasy-accent data-[state=checked]:bg-darkFantasy-accent"
                  />
                  <div>
                    <Label htmlFor={trait.id} className="text-white font-medium cursor-pointer">
                      {trait.label}
                    </Label>
                    <p className="text-sm text-darkFantasy-accent">{trait.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleCreate}
            disabled={!name || !selectedClass}
            className="w-full bg-darkFantasy-accent hover:bg-darkFantasy-highlight text-white font-gothic py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Embrace the Darkness
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};