import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { loadStats } from '../utils/storage';

interface RecentActivity {
  game: string;
  score: number;
}

function Dashboard() {
  const [stats, setStats] = useState<{
    timeSpent: number;
    totalScore: number;
    recentActivity: RecentActivity[];
  }>({ timeSpent: 0, totalScore: 0, recentActivity: [] });

  useEffect(() => {
    const data = loadStats();
    const today = new Date().toISOString().split('T')[0];
    const timeSpent = data[today] || 0;
    const scores: Record<string, number> = data.scores || {};
    const totalScore = Object.values(scores).reduce((sum, val) => sum + val, 0);

    setStats({
      timeSpent,
      totalScore,
      recentActivity: Object.entries(scores).map(([game, score]) => ({
        game,
        score,
      })),
    });
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

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
          <ul className="space-y-2">
            {stats.recentActivity.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{item.game}</span>
                <span className="font-medium">{item.score} points</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent activity yet. Play a game!</p>
        )}
      </Card>
    </div>
  );
}

export default Dashboard;