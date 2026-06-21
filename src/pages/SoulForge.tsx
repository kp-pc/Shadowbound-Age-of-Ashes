"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { loadCharacter, saveCharacter } from "@/utils/characterStorage";
import { loadStats } from "@/utils/storage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Link } from "react-router-dom";
import { Sparkles, Trophy, Shield, Flame, Sword, Star, Wand2, RefreshCw, UserPlus } from "lucide-react";
import { toast } from "sonner";

interface ShopItem {
  id: string;
  name: string;
  type: "stat" | "item" | "spell";
  cost: number;
  description: string;
  rarity?: "common" | "uncommon" | "rare" | "epic" | "legendary";
  statTarget?: "strength" | "intelligence" | "agility" | "charisma";
  rewardPayload?: any;
}

const FORGE_ITEMS: ShopItem[] = [
  // Stats
  {
    id: "pot-str",
    name: "Elixir of Iron Will",
    type: "stat",
    cost: 30,
    description: "Permanently increases Strength by +1. Tastes like iron and ash.",
    statTarget: "strength",
  },
  {
    id: "pot-int",
    name: "Essence of Forbidden Lore",
    type: "stat",
    cost: 30,
    description: "Permanently increases Intelligence by +1. Whispers ancient formulas in your head.",
    statTarget: "intelligence",
  },
  {
    id: "pot-agi",
    name: "Phial of Shadow-Step",
    type: "stat",
    cost: 30,
    description: "Permanently increases Agility by +1. Makes your movements silent and fluid.",
    statTarget: "agility",
  },
  {
    id: "pot-cha",
    name: "Serum of Overlord Presence",
    type: "stat",
    cost: 30,
    description: "Permanently increases Charisma by +1. Commands obedience with a single glance.",
    statTarget: "charisma",
  },
  // Spells
  {
    id: "spell-blood-flame",
    name: "Scroll of Blood Flame",
    type: "spell",
    cost: 50,
    description: "Unlocks the Blood Flame spell. Ignite the atmosphere with searing crimson fire.",
    rewardPayload: {
      id: "blood-flame",
      name: "Blood Flame",
      description: "Ignite the air with crimson fire.",
      color: "bg-red-600",
    },
  },
  {
    id: "spell-spectral-wind",
    name: "Scroll of Spectral Wind",
    type: "spell",
    cost: 65,
    description: "Unlocks the Spectral Wind spell. Hurl cold, wailing winds of lost spirits.",
    rewardPayload: {
      id: "spectral-wind",
      name: "Spectral Wind",
      description: "Hurl cold wailing wind of lost spirits.",
      color: "bg-teal-600",
    },
  },
  // Legendary Items
  {
    id: "item-scythe",
    name: "Scythe of the Harvester",
    type: "item",
    cost: 100,
    description: "A legendary weapon that reaps the life force of your enemies.",
    rarity: "legendary",
    rewardPayload: {
      id: "harvester-scythe",
      name: "Scythe of the Harvester",
      type: "weapon",
      description: "A legendary weapon that reaps the life force of your enemies.",
      rarity: "legendary",
    },
  },
  {
    id: "item-ring",
    name: "Doomlord's Signet",
    type: "item",
    cost: 80,
    description: "An epic ring inscribed with runes of absolute ruin and protection.",
    rarity: "epic",
    rewardPayload: {
      id: "doomlord-ring",
      name: "Doomlord's Signet",
      type: "armor",
      description: "An epic ring inscribed with runes of absolute ruin and protection.",
      rarity: "epic",
    },
  }
];

export const SoulForge: React.FC = () => {
  const [character, setCharacter] = useState<any>(null);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

  const loadForgeData = useCallback(() => {
    const char = loadCharacter();
    setCharacter(char);

    const stats = loadStats();
    const scores: Record<string, number> = stats.scores || {};
    
    // Sum total scores earned across all trials
    const filteredScores = char
      ? Object.entries(scores).filter(([key]) => key.startsWith(char.name + ":"))
      : Object.entries(scores);

    const scoreSum = filteredScores.reduce((sum, [, val]) => sum + (val as number), 0);
    setTotalScore(scoreSum);

    // Track items already purchased or inventory items/spells already acquired
    const acquiredIds: string[] = [];
    
    const storedInventory = localStorage.getItem("shadowboundInventory");
    if (storedInventory) {
      const inv = JSON.parse(storedInventory);
      inv.forEach((item: any) => {
        if (item.id === "harvester-scythe") acquiredIds.push("item-scythe");
        if (item.id === "doomlord-ring") acquiredIds.push("item-ring");
      });
    }

    const storedSpells = localStorage.getItem("shadowboundSpells");
    if (storedSpells) {
      const spellsList = JSON.parse(storedSpells);
      spellsList.forEach((spell: any) => {
        if (spell.id === "blood-flame") acquiredIds.push("spell-blood-flame");
        if (spell.id === "spectral-wind") acquiredIds.push("spell-spectral-wind");
      });
    }

    setPurchasedIds(acquiredIds);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadForgeData();
  }, [loadForgeData]);

  const spendShards = (amount: number) => {
    // Deduct from overall score in localStorage
    const stats = loadStats();
    stats.scores = stats.scores || {};
    
    // We deduct the score from one of the keys or apply a penalty/balance modifier
    // To cleanly manage "currency", we can store a spend modifier or subtract from total scores.
    // Let's deduct from the main character's trial stats so their net balance changes.
    if (!character) return false;

    const characterKeys = Object.keys(stats.scores).filter(key => key.startsWith(character.name + ":"));
    
    let amountToDeduct = amount;
    for (const key of characterKeys) {
      const currentVal = stats.scores[key] || 0;
      if (currentVal >= amountToDeduct) {
        stats.scores[key] = currentVal - amountToDeduct;
        amountToDeduct = 0;
        break;
      } else {
        amountToDeduct -= currentVal;
        stats.scores[key] = 0;
      }
    }

    localStorage.setItem("timePasserStats", JSON.stringify(stats));
    return true;
  };

  const handlePurchase = (item: ShopItem) => {
    if (totalScore < item.cost) {
      toast.error("Insufficient Soul Shards. Face more Arcane Trials or enter the Combat Arena!");
      return;
    }

    // 1. Deduct Soul Shards
    const success = spendShards(item.cost);
    if (!success) {
      toast.error("Failed to process transaction with the void.");
      return;
    }

    // 2. Apply Rewards
    if (item.type === "stat" && item.statTarget) {
      const updatedChar = { ...character };
      updatedChar.traits[item.statTarget] = (updatedChar.traits[item.statTarget] || 0) + 1;
      saveCharacter(updatedChar);
      toast.success(`Success! Your ${item.statTarget} increased by +1.`);
    } 
    
    else if (item.type === "spell" && item.rewardPayload) {
      const stored = localStorage.getItem("shadowboundSpells");
      const spells = stored ? JSON.parse(stored) : [];
      spells.push(item.rewardPayload);
      localStorage.setItem("shadowboundSpells", JSON.stringify(spells));
      window.dispatchEvent(new Event("spellsUpdated"));
      toast.success(`Spell Unlocked: ${item.rewardPayload.name}!`);
    } 
    
    else if (item.type === "item" && item.rewardPayload) {
      const stored = localStorage.getItem("shadowboundInventory");
      const inventory = stored ? JSON.parse(stored) : [];
      inventory.push(item.rewardPayload);
      localStorage.setItem("shadowboundInventory", JSON.stringify(inventory));
      window.dispatchEvent(new Event("inventoryUpdated"));
      toast.success(`Equipment Acquired: ${item.rewardPayload.name}!`);
    }

    // Reload data to reflect new shards balance and stats
    loadForgeData();
  };

  if (loading) return <LoadingSpinner size="lg" />;

  if (!character) {
    return (
      <div className="max-w-md mx-auto p-4 animate-fade-in-up">
        <Card className="bg-darkFantasy-primary border-darkFantasy-border text-center p-8">
          <CardHeader>
            <div className="w-16 h-16 bg-darkFantasy-accent/30 rounded-full flex items-center justify-center mx-auto mb-4 text-darkFantasy-highlight border border-darkFantasy-highlight/30">
              <Wand2 className="w-8 h-8" />
            </div>
            <CardTitle className="text-3xl font-gothic text-darkFantasy-highlight">Soul Forge Sealed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-darkFantasy-accent">
              You must forge a dark hero to harness the energies of the Soul Forge.
            </p>
            <Link to="/character">
              <Button className="w-full bg-darkFantasy-accent hover:bg-darkFantasy-highlight text-white font-gothic py-3 flex items-center justify-center gap-2">
                <UserPlus className="w-4 h-4" /> Forge Hero Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="border-b border-darkFantasy-border pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-gothic text-darkFantasy-highlight">The Soul Forge</h1>
          <p className="text-darkFantasy-accent mt-1">Reforge your destiny. Sacrifice harvested Soul Shards to bolster your abilities and arsenal.</p>
        </div>
        <div className="bg-darkFantasy-secondary/30 border border-darkFantasy-border px-4 py-2.5 rounded-lg flex items-center gap-2.5 shadow-md">
          <Trophy className="text-darkFantasy-highlight w-5 h-5 animate-pulse" />
          <div className="text-left">
            <span className="text-[10px] text-darkFantasy-accent uppercase block font-bold">Your Soul Shards</span>
            <span className="text-xl font-bold text-white">{totalScore} Shards</span>
          </div>
        </div>
      </div>

      {/* Main Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Potions & Elixirs (Stats) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-darkFantasy-border pb-2">
            <Star className="text-darkFantasy-highlight w-5 h-5" />
            <h2 className="text-xl font-gothic text-darkFantasy-highlight">Elixirs (Attributes)</h2>
          </div>
          <div className="space-y-4">
            {FORGE_ITEMS.filter(i => i.type === "stat").map(item => (
              <Card key={item.id} className="bg-darkFantasy-primary border-darkFantasy-border hover:border-darkFantasy-accent transition-colors">
                <CardContent className="p-4 flex flex-col justify-between h-full gap-4">
                  <div>
                    <h3 className="font-bold text-white">{item.name}</h3>
                    <p className="text-xs text-darkFantasy-accent mt-1">{item.description}</p>
                    {item.statTarget && (
                      <span className="text-[10px] text-darkFantasy-highlight uppercase font-bold tracking-widest mt-2 block">
                        Current Value: {character.traits[item.statTarget]}
                      </span>
                    )}
                  </div>
                  <Button 
                    onClick={() => handlePurchase(item)}
                    disabled={totalScore < item.cost}
                    className="w-full bg-darkFantasy-secondary/50 hover:bg-darkFantasy-accent text-white font-gothic text-sm border border-darkFantasy-border hover:border-transparent"
                  >
                    Forge for {item.cost} Shards
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Forbidden Spell scrolls (Spells) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-darkFantasy-border pb-2">
            <Flame className="text-darkFantasy-highlight w-5 h-5" />
            <h2 className="text-xl font-gothic text-darkFantasy-highlight">Arcane Scrolls (Spells)</h2>
          </div>
          <div className="space-y-4">
            {FORGE_ITEMS.filter(i => i.type === "spell").map(item => {
              const isOwned = purchasedIds.includes(item.id);
              return (
                <Card key={item.id} className="bg-darkFantasy-primary border-darkFantasy-border hover:border-darkFantasy-accent transition-colors">
                  <CardContent className="p-4 flex flex-col justify-between h-full gap-4">
                    <div>
                      <h3 className="font-bold text-white">{item.name}</h3>
                      <p className="text-xs text-darkFantasy-accent mt-1">{item.description}</p>
                    </div>
                    <Button 
                      onClick={() => handlePurchase(item)}
                      disabled={isOwned || totalScore < item.cost}
                      className={`w-full font-gothic text-sm ${
                        isOwned 
                          ? "bg-green-950/20 text-green-400 border border-green-500/30 cursor-not-allowed" 
                          : "bg-darkFantasy-secondary/50 hover:bg-darkFantasy-accent text-white border border-darkFantasy-border hover:border-transparent"
                      }`}
                    >
                      {isOwned ? "Already Learned" : `Forge for ${item.cost} Shards`}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Relics & Arms (Items) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-darkFantasy-border pb-2">
            <Sword className="text-darkFantasy-highlight w-5 h-5" />
            <h2 className="text-xl font-gothic text-darkFantasy-highlight">Shadow Armaments</h2>
          </div>
          <div className="space-y-4">
            {FORGE_ITEMS.filter(i => i.type === "item").map(item => {
              const isOwned = purchasedIds.includes(item.id);
              return (
                <Card key={item.id} className="bg-darkFantasy-primary border-darkFantasy-border hover:border-darkFantasy-accent transition-colors">
                  <CardContent className="p-4 flex flex-col justify-between h-full gap-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-white">{item.name}</h3>
                        <span className="text-[9px] uppercase font-bold tracking-wider text-yellow-400">
                          {item.rarity}
                        </span>
                      </div>
                      <p className="text-xs text-darkFantasy-accent mt-1">{item.description}</p>
                    </div>
                    <Button 
                      onClick={() => handlePurchase(item)}
                      disabled={isOwned || totalScore < item.cost}
                      className={`w-full font-gothic text-sm ${
                        isOwned 
                          ? "bg-green-950/20 text-green-400 border border-green-500/30 cursor-not-allowed" 
                          : "bg-darkFantasy-secondary/50 hover:bg-darkFantasy-accent text-white border border-darkFantasy-border hover:border-transparent"
                      }`}
                    >
                      {isOwned ? "Already Equipped" : `Forge for ${item.cost} Shards`}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

      </div>

      {/* Footer warning */}
      <p className="text-center text-xs text-darkFantasy-accent italic">
        "Be careful what you bargain for, traveler. The forge reshapes your essence, but the void always collects its toll."
      </p>
    </div>
  );
};

export default SoulForge;