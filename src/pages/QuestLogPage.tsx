import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestLog } from "@/components/game/QuestLog";
import { BookOpen, Trophy, Sparkles } from "lucide-react";

export const QuestLogPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="border-b border-darkFantasy-border pb-6">
        <h1 className="text-4xl font-gothic text-darkFantasy-highlight flex items-center gap-2">
          <BookOpen className="w-9 h-9 animate-pulse" />
          Quest Journal
        </h1>
        <p className="text-darkFantasy-accent mt-1">
          Keep track of your current achievements, dark objectives, and active bounties within Age of Ashes.
        </p>
      </div>

      <Card className="bg-darkFantasy-primary border-darkFantasy-border overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-darkFantasy-accent/10 rounded-full blur-3xl pointer-events-none" />
        <CardHeader className="border-b border-darkFantasy-border/50 bg-darkFantasy-secondary/10">
          <CardTitle className="text-xl font-gothic text-darkFantasy-highlight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-darkFantasy-highlight" />
            Fate Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <QuestLog />
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestLogPage;