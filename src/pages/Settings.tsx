"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Settings as SettingsIcon, Volume2, VolumeX, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { clearCharacter } from "@/utils/characterStorage";
import { clearStoryProgress } from "@/utils/storyStorage";

function Settings() {
  const [loading, setLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleReset = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    clearCharacter();
    clearStoryProgress();
    localStorage.removeItem("timePasserStats");
    toast.success("All progress has been returned to the void.");
    setLoading(false);
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  return (
    <div className="max-w-md mx-auto p-4 animate-fade-in-up">
      <Card className="bg-darkFantasy-primary border-darkFantasy-border overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>
        <CardHeader className="border-b border-darkFantasy-border/50 bg-darkFantasy-secondary/20 p-6">
          <div className="flex items-center gap-2">
            <SettingsIcon className="text-darkFantasy-highlight w-5 h-5" />
            <CardTitle className="text-xl font-gothic text-darkFantasy-highlight">Arcane Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {loading ? (
            <LoadingSpinner size="lg" />
          ) : (
            <div className="space-y-6">
              {/* Sound Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-darkFantasy-secondary/40 border border-darkFantasy-border">
                <div>
                  <h3 className="font-gothic text-darkFantasy-highlight">Audio Feedback</h3>
                  <p className="text-xs text-darkFantasy-accent mt-1">Enable sound-like visual cues and alerts.</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSoundEnabled(!soundEnabled);
                    toast.success(soundEnabled ? "Audio cues silenced." : "Audio cues awakened.");
                  }}
                  className="border-darkFantasy-border text-darkFantasy-highlight hover:bg-darkFantasy-secondary"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
              </div>

              {/* Reset Progress */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-red-950/10 border border-red-900/30">
                <div>
                  <h3 className="font-gothic text-red-400">Reset Progress</h3>
                  <p className="text-xs text-red-300/60 mt-1">Erase your hero, story progress, and high scores.</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleReset}
                  className="bg-red-900/80 hover:bg-red-800 text-white flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Reset
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Settings;