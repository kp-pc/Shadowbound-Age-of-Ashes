"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { loadCharacter } from "@/utils/characterStorage";
import { saveScore } from "@/utils/storage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Link } from "react-router-dom";
import { Sword, Flame, Shield, Heart, Zap, Sparkles, Scroll, Trophy, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { QuestLog } from "@/components/game/QuestLog"; // New import

interface Enemy {
  name: string;
  maxHp: number;
  hp: number;
  attack: number;
  description: string;
  image: string;
  soulReward: number;
}

const ENEMIES: Enemy[] = [
  {
    name: "Void Crawler",
    maxHp: 40,
    hp: 40,
    attack: 8,
    description: "A skittering abomination born from raw darkness.",
    image: "🕷️",
    soulReward: 25,
  },
  {
    name: "Grave Wraith",
    maxHp: 65,
    hp: 65,
    attack: 12,
    description: "The restless spirit of a long-dead high inquisitor.",
    image: "👻",
    soulReward: 45,
  },
  {
    name: "Abyssal Behemoth",
    maxHp: 100,
    hp: 100,
    attack: 18,
    description: "A towering colossus of fused obsidian and tormented souls.",
    image: "👹",
    soulReward: 80,
  }
];

export const CombatArena: React.FC = () => {
  const [character, setCharacter] = useState<any>(null);
  const [inventory, setInventory] = useState<any[]>([]);
  const [spells, setSpells] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Combat State
  const [enemy, setEnemy] = useState<Enemy | null>(null);
  const [playerHp, setPlayerHp] = useState(100);
  const [playerMaxHp] = useState(100);
  const [combatLogs, setCombatLogs] = useState<string[]>([]);
  const [isCombatOver, setIsCombatOver] = useState(false);
  const [combatOutcome, setCombatOutcome] = useState<"victory" | "defeat" | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [shieldActive, setShieldActive] = useState(0);

  useEffect(() => {
    const char = loadCharacter();
    setCharacter(char);

    const storedInventory = localStorage.getItem("shadowboundInventory");
    if (storedInventory) {
      setInventory(JSON.parse(storedInventory));
    }

    const storedSpells = localStorage.getItem("shadowboundSpells");
    if (storedSpells) {
      setSpells(JSON.parse(storedSpells));
    }

    setLoading(false);
  }, []);

  const startCombat = useCallback((selectedEnemy: Enemy) => {
    setEnemy({ ...selectedEnemy });
    setPlayerHp(100);
    setShieldActive(0);
    setIsCombatOver(false);
    setCombatOutcome(null);
    setIsPlayerTurn(true);
    setCombatLogs([`A wild ${selectedEnemy.name} emerges from the shadows! Prepare yourself.`]);
    toast.success(`You challenge the ${selectedEnemy.name}!`);
  }, []);

  const addLog = useCallback((log: string) => {
    setCombatLogs((prev) => [log, ...prev]);
  }, []);

  const enemyTurn = useCallback((currentShield: number, currentPlayerHp: number) => {
    if (!enemy) return;

    setTimeout(() => {
      // Calculate enemy damage
      const rawDamage = Math.floor(Math.random() * 5) + enemy.attack;
      let finalDamage = Math.max(1, rawDamage - currentShield);
      const remainingShield = Math.max(0, currentShield - rawDamage);
      
      setShieldActive(remainingShield);
      const nextHp = Math.max(0, currentPlayerHp - finalDamage);
      setPlayerHp(nextHp);

      addLog(`💥 The ${enemy.name} attacks you for ${finalDamage} damage! ${remainingShield > 0 ? `(Shield absorbed ${rawDamage - finalDamage})` : ""}`);

      if (nextHp <= 0) {
        setIsCombatOver(true);
        setCombatOutcome("defeat");
        addLog("💀 You have fallen in combat. The void claims another victim.");
        toast.error("Defeat! You succumbed to the shadow beast.");
      } else {
        setIsPlayerTurn(true);
      }
    }, 1000);
  }, [enemy, addLog]);

  const handleAttack = useCallback(() => {
    if (!enemy || !isPlayerTurn || isCombatOver) return;

    // Use weapon multiplier or base strength
    const strengthMultiplier = character?.traits?.strength || 5;
    const baseDamage = Math.floor(Math.random() * 6) + 6; // 6-11 base
    const damage = baseDamage + Math.floor(strengthMultiplier / 2);

    const nextEnemyHp = Math.max(0, enemy.hp - damage);
    setEnemy((prev) => prev ? { ...prev, hp: nextEnemyHp } : null);
    addLog(`⚔️ You strike the ${enemy.name} for ${damage} damage!`);
    setIsPlayerTurn(false);

    if (nextEnemyHp <= 0) {
      setIsCombatOver(true);
      setCombatOutcome("victory");
      addLog(`✨ Victory! You defeated the ${enemy.name}!`);
      toast.success(`Victory! You harvested ${enemy.soulReward} Soul Shards.`);
      // Save Score to stats
      const key = character ? `${character.name}:combat` : "combat";
      saveScore(key, enemy.soulReward);
      setIsPlayerTurn(false);
    } else {
      enemyTurn(shieldActive, playerHp);
    }
  }, [enemy, isPlayerTurn, isCombatOver, character, shieldActive, playerHp, enemyTurn, addLog]);

  const handleCastSpell = useCallback((spell: any) => {
    if (!enemy || !isPlayerTurn || isCombatOver) return;

    const intelligenceMultiplier = character?.traits?.intelligence || 5;
    let damage = 0;
    let spellLog = "";

    if (spell.id === "shadow-bolt") {
      damage = Math.floor(Math.random() * 10) + 10 + Math.floor(intelligenceMultiplier / 2);
      spellLog = `🔮 You cast Shadow Bolt! Dark bolts of energy blast the ${enemy.name} for ${damage} damage.`;
    } else if (spell.id === "blood-flame") {
      damage = Math.floor(Math.random() * 14) + 8 + Math.floor(intelligenceMultiplier / 2);
      spellLog = `🔥 You cast Blood Flame! Torrents of crimson fire scorch the ${enemy.name} for ${damage} damage.`;
    } else if (spell.id === "void-shield") {
      const shieldAmount = 15 + Math.floor(intelligenceMultiplier / 2);
      setShieldActive((prev) => prev + shieldAmount);
      spellLog = `🛡️ You cast Void Shield! A protective barrier of absolute darkness absorbs the next ${shieldAmount} damage.`;
    }

    if (damage > 0) {
      const nextEnemyHp = Math.max(0, enemy.hp - damage);
      setEnemy((prev) => prev ? { ...prev, hp: nextEnemyHp } : null);
      addLog(spellLog);

      if (nextEnemyHp <= 0) {
        setIsCombatOver(true);
        setCombatOutcome("victory");
        addLog(`✨ Victory! You defeated the ${enemy.name}!`);
        toast.success(`Victory! You harvested ${enemy.soulReward} Soul Shards.`);
        const key = character ? `${character.name}:combat` : "combat";
        saveScore(key, enemy.soulReward);
        setIsPlayerTurn(false);
        return;
      }
    } else {
      addLog(spellLog);
    }

    setIsPlayerTurn(false);
    enemyTurn(
      spell.id === "void-shield"
        ? shieldActive + (15 + Math.floor(intelligenceMultiplier / 2))
        : shieldActive,
      playerHp,
    );
  }, [enemy, isPlayerTurn, isCombatOver, character, shieldActive, playerHp, enemyTurn, addLog]);

  const handleDefend = useCallback(() => {
    if (!enemy || !isPlayerTurn || isCombatOver) return;

    const agilityMultiplier = character?.traits?.agility || 5;
    const blockAmount = Math.floor(agilityMultiplier / 2) + 5;
    setShieldActive((prev) => prev + blockAmount);

    addLog(`🛡️ You brace for impact! Block strength increased by ${blockAmount}.`);
    setIsPlayerTurn(false);
    enemyTurn(shieldActive + blockAmount, playerHp);
  }, [enemy, isPlayerTurn, isCombatOver, character, shieldActive, playerHp, enemyTurn, addLog]);

  if (loading) return <LoadingSpinner size="lg" />;

  if (!character) {
    return (
      <div className="max-w-md mx-auto p-4 animate-fade-in-up">
        <Card className="bg-darkFantasy-primary border-darkFantasy-border text-center p-8">
          <CardHeader>
            <div className="w-16 h-16 bg-darkFantasy-accent/30 rounded-full flex items-center justify-center mx-auto mb-4 text-darkFantasy-highlight border border-darkFantasy-highlight/30">
              <Sword className="w-8 h-8" />
            </div>
            <CardTitle className="text-3xl font-gothic text-darkFantasy-highlight">Combat Arena Locked</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-darkFantasy-accent">
              You must forge a dark hero to challenge the entities that dwell within the void.
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
          <h1 className="text-4xl font-gothic text-darkFantasy-highlight">Shadow Beast Arena</h1>
          <p className="text-darkFantasy-accent mt-1">Conquer the entities of the void and harvest their soul essence.</p>
        </div>
        {enemy && (
          <Button 
            variant="outline" 
            onClick={() => setEnemy(null)}
            className="border-darkFantasy-border text-darkFantasy-highlight hover:bg-darkFantasy-secondary hover:text-white"
          >
            Flee Arena
          </Button>
        )}
      </div>

      {!enemy ? (
        /* Enemy Selection Menu */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ENEMIES.map((beast) => (
            <Card 
              key={beast.name}
              className="bg-darkFantasy-primary border-darkFantasy-border hover:border-darkFantasy-accent transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between overflow-hidden relative group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-darkFantasy-accent/10 rounded-full blur-2xl pointer-events-none" />
              <CardHeader className="p-6">
                <div className="text-5xl mb-4 animate-bounce" style={{ animationDuration: '3s' }}>
                  {beast.image}
                </div>
                <CardTitle className="text-2xl font-gothic text-darkFantasy-highlight group-hover:text-white transition-colors">
                  {beast.name}
                </CardTitle>
                <p className="text-xs text-darkFantasy-accent uppercase font-bold tracking-wider mt-1">
                  HP: {beast.maxHp} | ATK: {beast.attack}
                </p>
                <CardDescription className="text-darkFantasy-accent mt-3">
                  {beast.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <Button 
                  onClick={() => startCombat(beast)}
                  className="w-full bg-darkFantasy-accent hover:bg-darkFantasy-highlight text-white font-gothic py-3 flex items-center justify-center gap-2"
                >
                  <Sword className="w-4 h-4" /> Challenge Entity
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Active Combat Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Battlefield (Left 7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="bg-darkFantasy-primary border-darkFantasy-border overflow-hidden">
              <div className="p-6 bg-darkFantasy-secondary/20 border-b border-darkFantasy-border/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-3xl animate-pulse">{enemy.image}</span>
                  <div>
                    <h3 className="font-gothic text-xl text-darkFantasy-highlight">{enemy.name}</h3>
                    <p className="text-xs text-darkFantasy-accent">Abyssal Creature</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-white block">{enemy.hp} / {enemy.maxHp} HP</span>
                  <Progress value={(enemy.hp / enemy.maxHp) * 100} className="w-32 bg-darkFantasy-shadow" />
                </div>
              </div>

              <CardContent className="p-6 space-y-8">
                {/* Visual Encounter Arena */}
                <div className="h-48 rounded-lg bg-darkFantasy-shadow border border-darkFantasy-border relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-radial-gradient from-darkFantasy-accent/10 to-transparent pointer-events-none" />
                  
                  {/* Visual indicators */}
                  <div className="flex items-center gap-12 z-10">
                    <div className="text-center">
                      <div className="text-4xl animate-pulse">🛡️</div>
                      <span className="text-xs text-darkFantasy-highlight font-bold font-gothic">Hero</span>
                    </div>
                    <div className="text-2xl font-gothic text-darkFantasy-highlight animate-pulse">VS</div>
                    <div className="text-center">
                      <div className="text-5xl animate-bounce">{enemy.image}</div>
                      <span className="text-xs text-red-400 font-bold font-gothic">{enemy.name}</span>
                    </div>
                  </div>
                </div>

                {/* Player Stats Panel */}
                <div className="bg-darkFantasy-secondary/10 p-4 rounded-lg border border-darkFantasy-border flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                      <span className="text-sm font-bold text-white">Your Vitality: {playerHp} / {playerMaxHp}</span>
                    </div>
                    <Progress value={(playerHp / playerMaxHp) * 100} className="w-48 bg-darkFantasy-shadow" />
                  </div>

                  {shieldActive > 0 && (
                    <div className="flex items-center gap-2 bg-blue-950/40 border border-blue-500/50 px-3 py-1.5 rounded-lg text-blue-300 text-sm animate-pulse">
                      <Shield className="w-4 h-4" />
                      <span>Shield: {shieldActive} HP</span>
                    </div>
                  )}
                </div>

                {/* Actions Block */}
                {!isCombatOver ? (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-darkFantasy-highlight">Command Deck</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <Button 
                        onClick={handleAttack}
                        disabled={!isPlayerTurn}
                        className="bg-darkFantasy-accent hover:bg-darkFantasy-highlight text-white font-gothic py-4 h-auto flex flex-col gap-1.5"
                      >
                        <Sword className="w-5 h-5" />
                        <span>Strike</span>
                      </Button>

                      <Button 
                        onClick={handleDefend}
                        disabled={!isPlayerTurn}
                        className="bg-darkFantasy-secondary hover:bg-darkFantasy-primary border border-darkFantasy-border text-darkFantasy-highlight hover:border-darkFantasy-accent font-gothic py-4 h-auto flex flex-col gap-1.5"
                      >
                        <Shield className="w-5 h-5" />
                        <span>Shield</span>
                      </Button>

                      {spells.map((spell) => (
                        <Button 
                          key={spell.id}
                          onClick={() => handleCastSpell(spell)}
                          disabled={!isPlayerTurn}
                          className="bg-indigo-950/40 border border-indigo-500/30 hover:border-indigo-500 text-indigo-200 hover:bg-indigo-900/40 font-gothic py-4 h-auto flex flex-col gap-1.5"
                        >
                          <Flame className="w-5 h-5 text-indigo-400" />
                          <span>Cast {spell.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4 py-4">
                    <div className="text-3xl font-gothic text-darkFantasy-highlight uppercase">
                      {combatOutcome === "victory" ? "🏆 Victory Accomplished" : "💀 Fallen to Void"}
                    </div>
                    <Button 
                      onClick={() => setEnemy(null)}
                      className="bg-darkFantasy-accent hover:bg-darkFantasy-highlight text-white font-gothic px-8 py-3"
                    >
                      Continue Journey
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Combat Log, Companion Deck & Quest Log (Right 5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Scroll of Battle Logs */}
            <Card className="bg-darkFantasy-primary border-darkFantasy-border">
              <CardHeader className="border-b border-darkFantasy-border/50 bg-darkFantasy-secondary/10 py-3">
                <CardTitle className="text-sm font-gothic text-darkFantasy-highlight flex items-center gap-2">
                  <Scroll className="w-4 h-4" /> Scroll of Battle Logs
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-64 overflow-y-auto space-y-2.5 pr-1 text-sm font-mono scrollbar-thin">
                  {combatLogs.map((log, index) => (
                    <div 
                      key={index} 
                      className={`p-2 rounded border leading-relaxed ${
                        index === 0 
                          ? "bg-darkFantasy-secondary/40 border-darkFantasy-accent text-white" 
                          : "bg-darkFantasy-shadow/20 border-darkFantasy-border/30 text-darkFantasy-accent"
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Combat Quick Reference */}
            <Card className="bg-darkFantasy-primary border-darkFantasy-border">
              <CardHeader className="border-b border-darkFantasy-border/50">
                <CardTitle className="text-sm font-gothic text-darkFantasy-highlight flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Combat Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3 text-sm">
                <div className="flex justify-between border-b border-darkFantasy-border/30 pb-2">
                  <span className="text-darkFantasy-accent">Fighter Strength:</span>
                  <span className="font-bold text-white">{character.traits.strength}</span>
                </div>
                <div className="flex justify-between border-b border-darkFantasy-border/30 pb-2">
                  <span className="text-darkFantasy-accent">Arcane Intelligence:</span>
                  <span className="font-bold text-white">{character.traits.intelligence}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-darkFantasy-accent">Evasive Agility:</span>
                  <span className="font-bold text-white">{character.traits.agility}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quest Log */}
            <Card className="bg-darkFantasy-primary border-darkFantasy-border">
              <CardHeader className="border-b border-darkFantasy-border/50 bg-darkFantasy-secondary/10 py-3">
                <CardTitle className="text-sm font-gothic text-darkFantasy-highlight flex items-center gap-2">
                  <Trophy className="w-4 h-4" /> Quest Log
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 max-h-64 overflow-y-auto">
                <QuestLog />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CombatArena;