import React, { useState, useEffect } from "react";
import { getQuests, Quest } from "@/utils/questStorage";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Flame, BookOpen, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export const QuestLog: React.FC = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");

  useEffect(() => {
    setQuests(getQuests());
    // Periodically update to catch background changes (timer / scores)
    const interval = setInterval(() => {
      setQuests(getQuests());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredQuests = quests.filter((q) => q.status === activeTab);

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2 p-1 bg-darkFantasy-shadow border border-darkFantasy-border rounded-lg">
        <button
          onClick={() => setActiveTab("active")}
          className={cn(
            "flex-1 py-2 text-xs font-gothic rounded transition-all flex items-center justify-center gap-1.5",
            activeTab === "active"
              ? "bg-darkFantasy-accent text-white shadow"
              : "text-darkFantasy-highlight hover:text-white"
          )}
        >
          <Circle className="w-3.5 h-3.5" />
          <span>Active Quests ({quests.filter((q) => q.status === "active").length})</span>
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={cn(
            "flex-1 py-2 text-xs font-gothic rounded transition-all flex items-center justify-center gap-1.5",
            activeTab === "completed"
              ? "bg-darkFantasy-accent text-white shadow"
              : "text-darkFantasy-highlight hover:text-white"
          )}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Completed ({quests.filter((q) => q.status === "completed").length})</span>
        </button>
      </div>

      {/* Quest Cards Grid */}
      {filteredQuests.length === 0 ? (
        <div className="text-center py-8 bg-darkFantasy-secondary/10 rounded-lg border border-darkFantasy-border border-dashed">
          <p className="text-xs text-darkFantasy-accent">
            {activeTab === "active" ? "All quests complete! Truly supreme, Overlord." : "No completed deeds... yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
          {filteredQuests.map((quest) => (
            <Card
              key={quest.id}
              className={cn(
                "bg-darkFantasy-secondary/30 border border-darkFantasy-border hover:border-darkFantasy-accent transition-all duration-300",
                quest.status === "completed" && "opacity-80"
              )}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="font-gothic text-sm text-darkFantasy-highlight flex items-center gap-1.5">
                      {quest.status === "completed" ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                      ) : (
                        <Flame className="w-4 h-4 text-darkFantasy-highlight animate-pulse shrink-0" />
                      )}
                      <span>{quest.title}</span>
                    </h4>
                    <p className="text-xs text-darkFantasy-accent mt-1 leading-relaxed">
                      {quest.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-darkFantasy-highlight font-medium">
                    <span>{quest.objective}</span>
                    <span>{quest.progressPercent}%</span>
                  </div>
                  <Progress value={quest.progressPercent} className="h-1.5 bg-darkFantasy-shadow" />
                </div>

                <div className="flex justify-between items-center text-[10px] border-t border-darkFantasy-border/40 pt-2">
                  <span className="text-darkFantasy-accent">Bounty:</span>
                  <Badge variant="outline" className="border-darkFantasy-accent text-darkFantasy-highlight text-[9px] px-1.5 py-0.5">
                    {quest.reward}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};