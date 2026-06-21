import React, { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StoryNode, StoryChoice } from "@/types";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const storyNodes: StoryNode[] = [
  // (same story nodes as before – omitted for brevity)
];

export const StoryInterface: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>("start");
  const [loading, setLoading] = useState(false);
  const currentNode = useMemo(() => storyNodes.find((n) => n.id === currentNodeId), [currentNodeId]);

  const handleChoice = useCallback(
    (choiceId: string) => {
      if (!currentNode) return;
      const choice = currentNode.choices?.find((c) => c.id === choiceId);
      if (choice) {
        setLoading(true);
        setTimeout(() => {
          setCurrentNodeId(choice.nextNodeId);
          setLoading(false);
        }, 300); // small transition delay
      }
    },
    [currentNode],
  );

  if (!currentNode) return <div>Error: Node not found</div>;

  if (currentNode.isEnding) {
    return (
      <div className="min-h-screen bg-darkFantasy-shadow p-4 flex items-center justify-center">
        <Card className="w-full max-w-2xl bg-darkFantasy-primary border-darkFantasy-border">
          <CardHeader>
            <CardTitle className="text-3xl font-gothic text-darkFantasy-highlight">
              Your Destiny is Fulfilled
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose dark:prose-invert text-darkFantasy-secondary break-words">{currentNode.text}</div>
            {onComplete && (
              <Button onClick={onComplete} className="w-full bg-darkFantasy-accent hover:bg-darkFantasy-highlight text-white font-gothic py-3">
                Return to Adventure
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const choiceButtons = useMemo(
    () =>
      currentNode.choices?.map((choice) => (
        <Button
          key={choice.id}
          variant="outline"
          onClick={() => handleChoice(choice.id)}
          className="w-full text-left bg-darkFantasy-secondary/50 hover:bg-darkFantasy-secondary border-darkFantasy-border text-darkFantasy-highlight font-gothic py-3 h-auto whitespace-normal"
        >
          <div className="flex flex-col">
            <span className="block">{choice.text}</span>
            {choice.consequences && (
              <span className="text-sm text-darkFantasy-accent italic mt-1">{choice.consequences}</span>
            )}
          </div>
        </Button>
      )),
    [currentNode.choices, handleChoice],
  );

  return (
    <div className="min-h-screen bg-darkFantasy-shadow p-4 flex items-center justify-center">
      {loading && <LoadingSpinner size="lg" />}
      <Card className="w-full max-w-2xl bg-darkFantasy-primary border-darkFantasy-border">
        <CardHeader>
          <CardTitle className="text-2xl font-gothic text-darkFantasy-highlight">Tale of the Shadow Realm</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose dark:prose-invert text-darkFantasy-secondary break-words">{currentNode.text}</div>
          {currentNode.choices?.length > 0 && <div className="space-y-3">{choiceButtons}</div>}
        </CardContent>
      </Card>
    </div>
  );
};