import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoryInterface } from '@/components/game/story-interface';
import { Inventory } from '@/components/game/inventory';
import { MagicSystem } from '@/components/game/magic-system';
import { QuestLog } from '@/components/game/QuestLog';
import { loadCharacter } from '@/utils/characterStorage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Backpack, Sparkles, User, ScrollText } from 'lucide-react';

const StoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [character, setCharacter] = useState<any>(null);

  useEffect(() => {
    const char = loadCharacter();
    setCharacter(char);
  }, []);

  const handleComplete = () => {
    navigate('/');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Branching Narrative (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        <StoryInterface onComplete={handleComplete} />
      </div>

      {/* Right Column: RPG Companion Panel (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        <Card className="bg-darkFantasy-primary border-darkFantasy-border shadow-xl shadow-darkFantasy-shadow/50">
          <CardHeader className="border-b border-darkFantasy-border/50 bg-darkFantasy-secondary/20 py-4">
            <CardTitle className="text-xl font-gothic text-darkFantasy-highlight flex items-center gap-2">
              <Shield className="w-5 h-5 animate-pulse" />
              Hero's Sanctum
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid grid-cols-4 bg-darkFantasy-shadow border border-darkFantasy-border p-1 rounded-lg">
                <TabsTrigger 
                  value="profile" 
                  className="data-[state=active]:bg-darkFantasy-accent data-[state=active]:text-white text-darkFantasy-highlight font-gothic text-[10px] py-2"
                >
                  <User className="w-3 h-3 mr-1" />
                  Profile
                </TabsTrigger>
                <TabsTrigger 
                  value="inventory" 
                  className="data-[state=active]:bg-darkFantasy-accent data-[state=active]:text-white text-darkFantasy-highlight font-gothic text-[10px] py-2"
                >
                  <Backpack className="w-3 h-3 mr-1" />
                  Bag
                </TabsTrigger>
                <TabsTrigger 
                  value="spells" 
                  className="data-[state=active]:bg-darkFantasy-accent data-[state=active]:text-white text-darkFantasy-highlight font-gothic text-[10px] py-2"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Spells
                </TabsTrigger>
                <TabsTrigger 
                  value="quests" 
                  className="data-[state=active]:bg-darkFantasy-accent data-[state=active]:text-white text-darkFantasy-highlight font-gothic text-[10px] py-2"
                >
                  <ScrollText className="w-3 h-3 mr-1" />
                  Quests
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="mt-4 space-y-4 animate-fade-in-up">
                {character ? (
                  <div className="space-y-4">
                    <div className="bg-darkFantasy-secondary/30 p-4 rounded-lg border border-darkFantasy-border">
                      <h3 className="text-lg font-gothic text-darkFantasy-highlight">{character.name}</h3>
                      <p className="text-xs text-darkFantasy-accent uppercase tracking-wider mt-0.5">Class: {character.className}</p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-darkFantasy-highlight mb-2">Core Attributes</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(character.traits).map(([key, val]) => (
                          <div key={key} className="bg-darkFantasy-secondary/20 p-3 rounded-lg border border-darkFantasy-border flex justify-between items-center">
                            <span className="text-xs text-darkFantasy-accent capitalize">{key}</span>
                            <span className="text-sm font-bold text-white">{val as number}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {character.darkFantasyTraits && character.darkFantasyTraits.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-darkFantasy-highlight mb-2">Awakened Traits</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {character.darkFantasyTraits.map((trait: string) => (
                            <span
                              key={trait}
                              className="text-[10px] bg-darkFantasy-accent/20 text-darkFantasy-highlight border border-darkFantasy-accent/40 px-2.5 py-1 rounded-full capitalize"
                            >
                              {trait.replace("-", " ")}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-darkFantasy-secondary/10 rounded-lg border border-darkFantasy-border border-dashed">
                    <p className="text-sm text-darkFantasy-accent mb-3">No hero has been forged yet.</p>
                    <button 
                      onClick={() => navigate('/character')}
                      className="text-xs bg-darkFantasy-accent hover:bg-darkFantasy-highlight text-white font-gothic px-4 py-2 rounded transition-colors"
                    >
                      Forge Hero
                    </button>
                  </div>
                )}
              </TabsContent>

              {/* Inventory Tab */}
              <TabsContent value="inventory" className="mt-4 animate-fade-in-up">
                <div className="max-h-[400px] overflow-y-auto pr-1">
                  <Inventory />
                </div>
              </TabsContent>

              {/* Spellbook Tab */}
              <TabsContent value="spells" className="mt-4 animate-fade-in-up">
                <div className="max-h-[400px] overflow-y-auto pr-1">
                  <MagicSystem />
                </div>
              </TabsContent>

              {/* Quests Tab */}
              <TabsContent value="quests" className="mt-4 animate-fade-in-up">
                <QuestLog />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoryPage;