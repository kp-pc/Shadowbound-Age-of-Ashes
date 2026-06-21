import React, { useState, useCallback, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { toast } from "sonner";

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
  { name: "Shadowblade", description: "Master of stealth and daggers", primaryStat: "agility" },
  { name: "Arcanist", description: "Wielder of forbidden magic", primaryStat: "intelligence" },
  { name: "Bloodknight", description: "Warrior cloaked in dark armor", primaryStat: "strength" },
  { name: "Visperator", description: "Charismatic manipulator of minds", primaryStat: "charisma" },
];

const DARK_FANTASY_TRAITS = [
  { id: "night-blood", label: "Night-Blood Heritage", description: "Enhanced strength under moonlight" },
  { id: "void-sight", label: "Void Sight", description: "See in complete darkness" },
  { id: "blood-mark", label: "Blood Mark", description: "Scarred by dark rituals" },
  { id: "whisper-voice", label: "Whisper Voice", description: "Command presence over others" },
  { id: "shadow-walk", label: "Shadow Walk", description: "Move through shadows unnoticed" },
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

/* Memoized slider component to avoid re‑rendering all sliders on each change */
const TraitSlider = React.memo(
  ({
    stat,
    value,
    onChange,
  }: {
    stat: keyof CharacterTraits;
    value: number;
    onChange: (v: number[]) => void;
  }) => (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label className="text-darkFantasy-secondary capitalize">{stat}</Label>
        <span className="text-darkFantasy-highlight font-bold">{value}</span>
      </div>
      <Slider value={[value]} onValueChange={onChange} max={10} min={1} step={1} className="w-full" />
    </div>
  ),
);

export const CharacterCreator: React.FC<CharacterCreatorProps> = ({ onComplete }) => {
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState<CharacterClass | null>(null);
  const [traits, setTraits] = useState<CharacterTraits>({
    strength: 5,
    intelligence: 5,
    agility: 5,
    charisma: 5,
  });
  const [selectedDarkTraits, setSelectedDarkTraits] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleTraitChange = useCallback(
    (stat: keyof CharacterTraits, value: number[]) => {
      setTraits((prev) => ({ ...prev, [stat]: value[0] }));
    },
    [],
  );

  const handleDarkTraitToggle = useCallback((traitId: string) => {
    setSelectedDarkTraits((prev) =>
      prev.includes(traitId) ? prev.filter((id) => id !== traitId) : [...prev, traitId],
    );
  }, []);

  const validateForm = useCallback(() => {
    if (!name.trim()) return "Name is required.";
    if (name.length < 2 || name.length > 50) return "Name must be between 2 and 50 characters.";
    if (!selectedClass) return "Please select a class.";
    return null;
  }, [name, selectedClass]);

  const handleCreate = useCallback(async () => {
    const error = validateForm();
    if (error) {
      setValidationError(error);
      toast.error(error);
      return;
    }
    setValidationError(null);
    setIsSubmitting(true);
    // Simulate async work (e.g., saving to localStorage)
    await new Promise((res) => setTimeout(res, 800));
    onComplete({
      name,
      className: selectedClass!.name,
      traits,
      darkFantasyTraits: selectedDarkTraits,
    });
    toast.success("Character created!");
    setIsSubmitting(false);
  }, [name, selectedClass, traits, selectedDarkTraits, onComplete, validateForm]);

  const traitSliders = useMemo(
    () =>
      Object.entries(traits).map(([stat, value]) => (
        <TraitSlider
          key={stat}
          stat={stat as keyof CharacterTraits}
          value={value}
          onChange={(v) => handleTraitChange(stat as keyof CharacterTraits, v)}
        />
      )),
    [traits, handleTraitChange],
  );

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
          {/* Name input */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-darkFantasy-highlight">
              Character Name
            </Label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={cn(
                "w-full px-3 py-2 bg-darkFantasy-secondary border border-darkFantasy-border rounded-md text-white placeholder:text-darkFantasy-accent focus:outline-none focus:ring-2 focus:ring-darkFantasy-accent",
                validationError && "border-red-500",
              )}
              placeholder="Enter a name whispered in fear..."
            />
          </div>

          {/* Class selector */}
          <div className="space-y-2">
            <Label className="text-darkFantasy-highlight">Choose Your Path</Label>
            <Select
              onValueChange={(value) =>
                setSelectedClass(CHARACTER_CLASSES.find((c) => c.name === value) || null)
              }
            >
              <SelectTrigger className="bg-darkFantasy-secondary border-darkFantasy-border text-white">
                <SelectValue placeholder="Select a dark class" />
              </SelectTrigger>
              <SelectContent className="bg-darkFantasy-primary border-darkFantasy-border">
                {CHARACTER_CLASSES.map((cls) => (
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

          {/* Core attributes */}
          <div className="space-y-4">
            <Label className="text-darkFantasy-highlight">Core Attributes</Label>
            {traitSliders}
          </div>

          {/* Dark fantasy traits */}
          <div className="space-y-2">
            <Label className="text-darkFantasy-highlight">Dark Fantasy Traits</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DARK_FANTASY_TRAITS.map((trait) => (
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

          {/* Submit button */}
          {isSubmitting ? (
            <LoadingSpinner size="md" />
          ) : (
            <Button
              onClick={handleCreate}
              disabled={!name || !selectedClass}
              className={cn(
                "w-full bg-darkFantasy-accent hover:bg-darkFantasy-highlight text-white font-gothic py-3 text-lg",
                (!name || !selectedClass) && "opacity-50 cursor-not-allowed",
              )}
            >
              Embrace the Darkness
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};