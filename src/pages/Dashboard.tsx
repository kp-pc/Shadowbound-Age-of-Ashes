"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { loadStats } from "../utils/storage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { loadCharacter } from "@/utils/characterStorage";
import { QuestLog } from "@/components/game/QuestLog";
import { Shield, Hourglass, Trophy, History, Play, UserPlus, Flame, Sword, BookOpen } from "lucide-react";

interface RecentActivity {
  game: string;
  score: number;
}

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{
    timeSpent: number;
    totalScore: number;
    recentActivity: RecentActivity[];
  }>({ timeSpent: 0, totalScore: 0, recentActivity: [] });
  const [character, setCharacter] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const char = loadCharacter();
        setCharacter(char);

        const data = loadStats();
        const today = new Date().toISOString().split("T")[0];
        const timeSpent = data[today] || 0;
        const scores: Record<string, number> = data.scores || {};

        // Filter scores by character name if character exists
        const filteredScores = char
          ? Object.entries(scores).filter(([key]) => key.startsWith(char.name + ":"))
          : Object.entries(scores);

        const totalScore = filteredScores.reduce((sum, [, val]) => sum + (val as number), 0);
        const recentActivity = filteredScores.map(([key, score]) => ({
          game: key.split(":")[1] || key,
          score: score as number,
        }));

        setStats({
          timeSpent,
          totalScore,
          recentActivity,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const activityList = useMemo(
    () =>
      stats.recentActivity.map((item, idx) => (
        <li
          key={idx}
          className="flex justify-between items-center p-3 rounded-lg bg-darkFantasy-primary/40 border border-darkFantasy-border hover:border-darkFantasy-accent transition-colors"
        >
          <span className="capitalize font-gothic text-darkFantasy-highlight">{item.game} Trial</span>
          <span className="font-bold text-white bg-darkFantasy-accent/30 px-3 py-1 rounded-full border border-darkFantasy-accent/50">
            {item.score} Shards
          </span>
        </li>
      )),
    [stats.recentActivity],
  );

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-darkFantasy-border pb-6">
        <div>
          <h1 className="text-4xl font-gothic text-darkFantasy-highlight">Soul Dashboard</h1>
          <p className="text-darkFantasy-accent mt-1">Monitor your progress, manage quests, and prepare for trials.</p>
        </div>
        {!character && (
          <Link to="/character">
            <Button className="bg-darkFantasy-accent hover:bg-darkFantasy-highlight text-white font-gothic flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> Forge Your Hero
            </Button>
          </Link>
        )}
      </div>

      {/* Grid of Hero Profile and Active Quests */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Hero Profile & Quick stats) */}
        <div className="lg:col-span-7 space-y-6">
          {character ? (
            <Card className="bg-darkFantasy-primary border-darkFantasy-border overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-darkFantasy-accent/10 rounded-full blur-3xl pointer-events-none"></div>
              <CardHeader className="border-b border-darkFantasy-border/50 bg-darkFantasy-secondary/20">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-darkFantasy-accent/30 border border-darkFantasy-highlight/30 text-darkFantasy-highlight">
                    <Shield className="w-8 h-8" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-gothic text-darkFantasy-highlight">
                      {character.name}
                    </CardTitle>
                    <p className="text-sm text-darkFantasy-accent font-medium uppercase tracking-wider">
                      Class: {character.className}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-darkFantasy-highlight mb-2">Core Attributes</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {Object.entries(character.traits).map(([key, val]) => (
                      <div key={key} className="bg-darkFantasy-secondary/40 p-3 rounded-lg border border-darkFantasy-border text-center">
                        <span className="text-xs text-darkFantasy-accent capitalize block">{key}</span>
                        <span className="text-xl font-bold text-white">{val as number}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {character.darkFantasyTraits && character.darkFantasyTraits.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-darkFantasy-highlight mb-2">Awakened Traits</h4>
                    <div className="flex flex-wrap gap-2">
                      {character.darkFantasyTraits.map((trait: string) => (
                        <span
                          key={trait}
                          className="text-xs bg-darkFantasy-accent/20 text-darkFantasy-highlight border border-darkFantasy-accent/40 px-3 py-1 rounded-full capitalize"
                        >
                          {trait.replace("-", " ")}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-darkFantasy-primary/40 border-darkFantasy-border border-dashed p-8 text-center">
              <p className="text-darkFantasy-accent mb-4">You have not forged a hero yet. Create one to track personalized scores and unlock unique story paths!</p>
              <Link to="/character">
                <Button className="bg-darkFantasy-accent hover:bg-darkFantasy-highlight text-white font-gothic">
                  Forge Hero Now
                </Button>
              </Link>
            </Card>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="bg-darkFantasy-primary border-darkFantasy-border hover:border-darkFantasy-accent transition-colors">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-4 rounded-lg bg-darkFantasy-secondary/50 text-darkFantasy-highlight">
                  <Hourglass className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-darkFantasy-accent uppercase tracking-wider">Time Spent Today</h3>
                  <p className="text-3xl font-bold text-white mt-1">{stats.timeSpent} <span className="text-sm font-normal text-darkFantasy-accent">seconds</span></p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-darkFantasy-primary border-darkFantasy-border hover:border-darkFantasy-accent transition-colors">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-4 rounded-lg bg-darkFantasy-secondary/50 text-darkFantasy-highlight">
                  <Trophy className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-darkFantasy-accent uppercase tracking-wider">Total Soul Shards</h3>
                  <p className="text-3xl font-bold text-white mt-1">{stats.totalScore} <span className="text-sm font-normal text-darkFantasy-accent">shards</span></p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Action Navigation Deck */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/story">
              <Card className="bg-darkFantasy-primary border-darkFantasy-border hover:border-darkFantasy-accent transition-all hover:scale-105 cursor-pointer text-center p-4">
                <BookOpen className="w-6 h-6 mx-auto mb-2 text-darkFantasy-highlight" />
                <span className="font-gothic text-sm block">Enter Story</span>
              </Card>
            </Link>
            <Link to="/combat">
              <Card className="bg-darkFantasy-primary border-darkFantasy-border hover:border-darkFantasy-accent transition-all hover:scale-105 cursor-pointer text-center p-4">
                <Sword className="w-6 h-6 mx-auto mb-2 text-darkFantasy-highlight" />
                <span className="font-gothic text-sm block">Shadow Arena</span>
              </Card>
            </Link>
            <Link to="/forge">
              <Card className="bg-darkFantasy-primary border-darkFantasy-border hover:border-darkFantasy-accent transition-all hover:scale-105 cursor-pointer text-center p-4">
                <Flame className="w-6 h-6 mx-auto mb-2 text-darkFantasy-highlight" />
                <span className="font-gothic text-sm block">Soul Forge</span>
              </Card>
            </Link>
          </div>
        </div>

        {/* Right Column (Quest Log Panel) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="bg-darkFantasy-primary border-darkFantasy-border">
            <CardHeader className="border-b border-darkFantasy-border/50 bg-darkFantasy-secondary/20 py-4">
              <CardTitle className="text-xl font-gothic text-darkFantasy-highlight flex items-center gap-2">
                <Trophy className="w-5 h-5 text-darkFantasy-highlight animate-pulse" />
                Active Fate Tracker
              </CardTitle>
              <CardDescription className="text-darkFantasy-accent text-xs">
                Complete objectives to gain ultimate bounties.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <QuestLog />
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-darkFantasy-primary border-darkFantasy-border">
            <CardHeader className="border-b border-darkFantasy-border/50">
              <div className="flex items-center gap-2">
                <History className="text-darkFantasy-highlight w-5 h-5" />
                <CardTitle className="text-xl font-gothic text-darkFantasy-highlight">Recent Trials</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {stats.recentActivity.length > 0 ? (
                <ul className="space-y-3">{activityList}</ul>
              ) : (
                <div className="text-center py-8">
                  <p className="text-darkFantasy-accent mb-4">No trials completed yet. Face the challenges of the void!</p>
                  <Link to="/games">
                    <Button className="bg-darkFantasy-accent hover:bg-darkFantasy-highlight text-white font-gothic flex items-center gap-2 mx-auto">
                      <Play className="w-4 h-4" /> Enter the Trials
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;