import React, { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StoryNode, StoryChoice } from "@/types";
import { LoadingSpinner } from "@/components/LoadingSpinner";

/* Minimal story data – can be expanded later */
const storyNodes: StoryNode[] = [
  {
    id: "start",
    text: "You awaken in a dimly lit crypt, the air thick with ancient whispers. Two passages lie before you.",
    choices: [
      { id: "c1", text: "Take the left corridor", nextNodeId: "left", consequences: "The walls seem to close in." },
      { id: "c2", text: "Take the right corridor", nextNodeId: "right", consequences: "A faint glow beckons." },
    ],
  },
  {
    id: "left",
    text: "Shadows coil around you, and a spectral blade hovers in the darkness.",
    choices: [
      { id: "c3", text: "Grab the blade", nextNodeId: "blade", consequences: "Cold runs through your veins." },
      { id: "c4", text: "Retreat", nextNodeId: "start", consequences: "You return to the entrance." },
    ],
  },
  {
    id: "right",
    text: "A warm ember fires a torch, revealing an ancient tome.",
    choices: [
      { id: "c5", text: "Read the tome", nextNodeId: "tome", consequences: "Knowledge floods your mind." },
      { id: "c6", text: "Ignore it", nextNodeId: "start", consequences: "You step back into darkness." },
    ],
  },
  {
    id: "blade",
    text: "The blade fuses with your hand, granting you shadowy power.",
    choices: [],
    isEnding: true,
  },
  {
    id: "tome",
    text: "The tome grants you insight, revealing a hidden exit.",
    choices: [],
    isEnding: true,
  },
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
        }, 300);
      }
    },
    [currentNode],
  );

  if (!currentNode) return <div className="p-4">Error: story node not found.</div>;

  if (currentNode.isEnding) {
    return (
      <div className="min-h-screen bg-darkFantasy-shadow p-4 flex items-center justify-center">
        <Card className="w-full max-w-2xl bg-darkFantasy-primary border-darkFantasy-border">
          <CardHeader>
            <CardTitle className="text-3xl font-gothic text-darkFantasy-highlight">
              The Tale Concludes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose dark:prose-invert text-darkFantasy-secondary">{currentNode.text}</div>
            {onComplete && (
              <Button
                onClick={onComplete}
                className="w-full bg-darkFantasy-accent hover:bg-darkFantasy-highlight text-white font-gothic py-3"
              >
                Return to Dashboard
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
            <span>{choice.text}</span>
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
          <CardTitle className="text-2xl font-gothic text-darkFantasy-highlight">Shadowbound Tale</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose dark:prose-invert text-darkFantasy-secondary">{currentNode.text}</div>
          <div className="space-y-3">{choiceButtons}</div>
        </CardContent>
      </Card>
    </div>
  );
};