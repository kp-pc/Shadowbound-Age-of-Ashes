import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StoryNode, StoryChoice } from "@/types";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { saveStoryProgress, loadStoryProgress, clearStoryProgress } from "@/utils/storyStorage";
import { loadCharacter } from "@/utils/characterStorage";
import { toast } from "sonner";
import { ShieldAlert, Sparkles, Backpack, Award } from "lucide-react";

const storyNodes: StoryNode[] = [
  {
    id: "start",
    text: "You awaken in a dimly lit crypt, the air thick with ancient whispers. Two passages lie before you. A heavy iron gate blocks the left corridor, while a faint, eerie glow beckons from the right.",
    choices: [
      { 
        id: "c1", 
        text: "Force open the heavy iron gate", 
        nextNodeId: "left_gate", 
        requiredStat: "strength",
        requiredStatValue: 6,
        consequences: "Requires Strength (6+). You brace yourself against the cold iron." 
      },
      { 
        id: "c2", 
        text: "Take the glowing right corridor", 
        nextNodeId: "right_glow", 
        consequences: "You step cautiously toward the light." 
      },
    ],
  },
  {
    id: "left_gate",
    text: "With a mighty heave, you shatter the rusted lock! Beyond the gate lies an ancient armory. Resting on a stone pedestal is a glowing crimson blade.",
    choices: [
      { 
        id: "c3", 
        text: "Claim the Blood-Forged Greatsword", 
        nextNodeId: "armory_claim", 
        rewardItem: {
          id: "blood-sword",
          name: "Blood-Forged Greatsword",
          type: "weapon",
          description: "A massive blade pulsing with dark energy.",
          rarity: "epic"
        },
        consequences: "You reach out to grasp the hilt." 
      },
      { 
        id: "c4", 
        text: "Search the dusty chests", 
        nextNodeId: "armory_search", 
        requiredStat: "agility",
        requiredStatValue: 5,
        consequences: "Requires Agility (5+). You search for hidden traps." 
      },
    ],
  },
  {
    id: "right_glow",
    text: "The glow leads you to a mystical library. Floating in the center is a swirling vortex of purple energy surrounding an ancient spellbook.",
    choices: [
      { 
        id: "c5", 
        text: "Decipher the ancient runes", 
        nextNodeId: "library_decipher", 
        requiredStat: "intelligence",
        requiredStatValue: 6,
        consequences: "Requires Intelligence (6+). You focus your mind on the glowing glyphs." 
      },
      { 
        id: "c6", 
        text: "Touch the swirling vortex", 
        nextNodeId: "library_vortex", 
        consequences: "You plunge your hand into the raw energy." 
      },
    ],
  },
  {
    id: "armory_claim",
    text: "The sword binds to your soul! You feel immense power coursing through your veins. Suddenly, a stone wall crumbles, revealing a path leading out into the twilight.",
    choices: [],
    isEnding: true,
  },
  {
    id: "armory_search",
    text: "Your quick reflexes save you from a poison dart trap! Inside the chest, you find a legendary Obsidian Shield.",
    choices: [
      {
        id: "c7",
        text: "Equip the Obsidian Shield and escape",
        nextNodeId: "shield_escape",
        rewardItem: {
          id: "obsidian-shield",
          name: "Obsidian Shield",
          type: "armor",
          description: "A shield forged from volcanic glass, impervious to magic.",
          rarity: "legendary"
        }
      }
    ]
  },
  {
    id: "shield_escape",
    text: "With the legendary shield strapped to your arm, you confidently stride through the exit into the twilight realm.",
    choices: [],
    isEnding: true,
  },
  {
    id: "library_decipher",
    text: "The runes become clear! You have unlocked the secrets of the Blood Flame spell.",
    choices: [
      {
        id: "c8",
        text: "Memorize the Blood Flame spell and escape",
        nextNodeId: "spell_escape",
        rewardSpell: {
          id: "blood-flame",
          name: "Blood Flame",
          description: "Ignite the air with crimson fire.",
          color: "bg-red-600"
        }
      }
    ]
  },
  {
    id: "spell_escape",
    text: "With the crimson fire of Blood Flame dancing on your fingertips, you step through the portal into the twilight realm.",
    choices: [],
    isEnding: true,
  },
  {
    id: "library_vortex",
    text: "The vortex violently rejects you, but leaves behind a strange glowing Void Essence.",
    choices: [
      {
        id: "c9",
        text: "Take the Void Essence and flee",
        nextNodeId: "vortex_escape",
        rewardItem: {
          id: "void-essence",
          name: "Void Essence",
          type: "consumable",
          description: "A swirling liquid that restores mana.",
          rarity: "uncommon"
        }
      }
    ]
  },
  {
    id: "vortex_escape",
    text: "Clutching the swirling essence, you run through the collapsing library doors into the twilight realm.",
    choices: [],
    isEnding: true,
  }
];

export const StoryInterface: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>("start");
  const [loading, setLoading] = useState(false);
  const [character, setCharacter] = useState<any>(null);

  // Load saved progress and character on mount
  useEffect(() => {
    const saved = loadStoryProgress();
    if (saved && storyNodes.some((n) => n.id === saved)) {
      setCurrentNodeId(saved);
    }
    setCharacter(loadCharacter());
  }, []);

  const currentNode = useMemo(() => storyNodes.find((n) => n.id === currentNodeId), [currentNodeId]);

  const handleChoice = useCallback(
    (choice: StoryChoice) => {
      if (!currentNode) return;

      // Check stat requirements
      if (choice.requiredStat && choice.requiredStatValue) {
        const playerStat = character?.traits?.[choice.requiredStat] || 0;
        if (playerStat < choice.requiredStatValue) {
          toast.error(`Stat Check Failed! You need ${choice.requiredStatValue} ${choice.requiredStat}, but you only have ${playerStat}.`);
          return;
        }
        toast.success(`Stat Check Passed! Your ${choice.requiredStat} (${playerStat}) carries you through.`);
      }

      setLoading(true);
      setTimeout(() => {
        // Handle rewards
        if (choice.rewardItem) {
          const stored = localStorage.getItem('shadowboundInventory');
          const inventory = stored ? JSON.parse(stored) : [];
          if (!inventory.some((item: any) => item.id === choice.rewardItem?.id)) {
            inventory.push(choice.rewardItem);
            localStorage.setItem('shadowboundInventory', JSON.stringify(inventory));
            window.dispatchEvent(new Event('inventoryUpdated'));
            toast.success(`Acquired: ${choice.rewardItem.name}!`, {
              icon: "🎒"
            });
          }
        }

        if (choice.rewardSpell) {
          const stored = localStorage.getItem('shadowboundSpells');
          const spells = stored ? JSON.parse(stored) : [];
          if (!spells.some((spell: any) => spell.id === choice.rewardSpell?.id)) {
            spells.push(choice.rewardSpell);
            localStorage.setItem('shadowboundSpells', JSON.stringify(spells));
            window.dispatchEvent(new Event('spellsUpdated'));
            toast.success(`Learned Spell: ${choice.rewardSpell.name}!`, {
              icon: "🔮"
            });
          }
        }

        setCurrentNodeId(choice.nextNodeId);
        saveStoryProgress(choice.nextNodeId);
        setLoading(false);
      }, 500);
    },
    [currentNode, character],
  );

  // When story ends, clear saved progress
  useEffect(() => {
    if (currentNode?.isEnding) {
      clearStoryProgress();
    }
  }, [currentNode]);

  if (!currentNode) {
    return <div className="p-4 text-darkFantasy-accent">Error: story node not found.</div>;
  }

  if (currentNode.isEnding) {
    return (
      <div className="min-h-screen bg-darkFantasy-shadow p-4 flex items-center justify-center">
        <Card className="w-full max-w-2xl bg-darkFantasy-primary border-darkFantasy-border shadow-2xl shadow-darkFantasy-accent/10">
          <CardHeader className="text-center">
            <Award className="w-12 h-12 text-darkFantasy-highlight mx-auto mb-2 animate-bounce" />
            <CardTitle className="text-3xl font-gothic text-darkFantasy-highlight">
              The Tale Concludes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="text-darkFantasy-secondary text-lg leading-relaxed">{currentNode.text}</div>
            {onComplete && (
              <Button
                onClick={onComplete}
                className="w-full bg-darkFantasy-accent hover:bg-darkFantasy-highlight text-white font-gothic py-3 text-lg transform transition-all duration-300 hover:scale-105"
              >
                Return to Dashboard
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darkFantasy-shadow p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-darkFantasy-primary border-darkFantasy-border shadow-2xl shadow-darkFantasy-accent/10">
        <CardHeader>
          <CardTitle className="text-2xl font-gothic text-darkFantasy-highlight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-darkFantasy-highlight animate-pulse" />
            Shadowbound Tale
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <div className="py-12">
              <LoadingSpinner size="lg" />
              <p className="text-center text-xs text-darkFantasy-accent mt-4 animate-pulse">The shadows shift...</p>
            </div>
          ) : (
            <>
              <div className="text-darkFantasy-secondary text-lg leading-relaxed bg-darkFantasy-secondary/10 p-4 rounded-lg border border-darkFantasy-border/50">
                {currentNode.text}
              </div>
              <div className="space-y-3">
                {currentNode.choices?.map((choice) => {
                  const hasStat = choice.requiredStat && choice.requiredStatValue;
                  const playerStat = character?.traits?.[choice.requiredStat!] || 0;
                  const isLocked = hasStat && playerStat < choice.requiredStatValue!;

                  return (
                    <Button
                      key={choice.id}
                      variant="outline"
                      onClick={() => handleChoice(choice)}
                      disabled={isLocked}
                      className={cn(
                        "w-full text-left bg-darkFantasy-secondary/30 hover:bg-darkFantasy-secondary border-darkFantasy-border text-darkFantasy-highlight font-gothic py-4 h-auto whitespace-normal transition-all duration-300 hover:border-darkFantasy-accent",
                        isLocked && "opacity-50 cursor-not-allowed hover:bg-darkFantasy-secondary/30 hover:border-darkFantasy-border"
                      )}
                    >
                      <div className="flex items-start gap-3 w-full">
                        {hasStat && (
                          <div className={cn(
                            "p-1.5 rounded border text-xs flex items-center gap-1 shrink-0",
                            isLocked ? "border-red-500/30 bg-red-950/20 text-red-400" : "border-green-500/30 bg-green-950/20 text-green-400"
                          )}>
                            <ShieldAlert className="w-3.5 h-3.5" />
                            <span className="capitalize">{choice.requiredStat} {choice.requiredStatValue}+</span>
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-semibold">{choice.text}</div>
                          {choice.consequences && (
                            <div className="text-xs text-darkFantasy-accent italic mt-1">{choice.consequences}</div>
                          )}
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};