import React, { useEffect, useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { loadStats } from "../utils/storage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { loadCharacter } from "@/utils/characterStorage";

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

        // If a character exists, filter scores by that character's name (or ID)
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
        <li key={idx} className="flex justify-between">
          <span>{item.game}</span>
          <span className="font-medium">{item.score} pts</span>
        </li>
      )),
    [stats.recentActivity],
  );

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {character && (
        <Card className="p-4 rounded-lg shadow-md bg-darkFantasy-secondary border-darkFantasy-border">
          <h3 className="text-xl font-gothic text-darkFantasy-highlight mb-2">
            Hero: {character.name} ({character.className})
          </h3>
          <p className="text-darkFantasy-accent">
            Traits: {Object.entries(character.traits)
              .map(([k, v]) => `${k}: ${v}`)
              .join(", ")}
          </p>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Time Spent Today</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.timeSpent} seconds</p>
        </Card>

        <Card className="p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Score</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalScore}</p>
        </Card>
      </div>

      <Card className="p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        {stats.recentActivity.length > 0 ? (
          <ul className="space-y-2">{activityList}</ul>
        ) : (
          <p className="text-gray-500">No recent activity yet. Play a game!</p>
        )}
      </Card>
    </div>
  );
}

export default Dashboard;