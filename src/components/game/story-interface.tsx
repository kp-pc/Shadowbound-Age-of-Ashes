import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { StoryNode, StoryChoice } from '@/types';

const storyNodes: StoryNode[] = [
  {
    id: 'start',
    text: 'You awaken in a cold stone chamber, the air thick with the scent of damp earth and ancient magic. Flickering torchlight casts dancing shadows on the walls, revealing strange symbols etched into the stone. A voice, barely a whisper, echoes in your mind: "The time has come, child of darkness. Your destiny awaits."',
    choices: [
      {
        id: 'investigate-symbols',
        text: 'Examine the strange symbols on the wall',
        nextNodeId: 'symbols',
        consequences: 'You may uncover hidden knowledge... or awaken something best left sleeping.'
      },
      {
        id: 'follow-voice',
        text: 'Follow the whispering voice deeper into the chamber',
        nextNodeId: 'voice',
        consequences: 'The voice may lead to power... or to a trap set by ancient enemies.'
      },
      {
        id: 'rest',
        text: 'Rest and gather your strength before proceeding',
        nextNodeId: 'rest',
        consequences: 'You regain some strength, but precious time may be lost.'
      }
    ]
  },
  {
    id: 'symbols',
    text: 'The symbols pulse with a faint crimson light as you trace them with your fingers. They form an ancient binding seal - one that has kept something imprisoned for centuries. As you touch the central glyph, a surge of energy courses through your veins. You feel... changed.',
    choices: [
      {
        id: 'break-seal',
        text: 'Attempt to break the seal and claim what lies beyond',
        nextNodeId: 'break-seal',
        consequences: 'You gain immense power, but at what cost to your soul?'
      },
      {
        id: 'strengthen-seal',
        text: 'Strengthen the seal to keep whatever is imprisoned contained',
        nextNodeId: 'strengthen-seal',
        consequences: 'You gain the respect of ancient guardians, but deny yourself potential power.'
      }
    ]
  },
  {
    id: 'voice',
    text: `The whispering voice grows clearer as you follow it: "Seek the Obsidian Altar, where the moon's blood flows freely. There, your true nature will be revealed." The voice seems to come from a shadowy figure just beyond the torchlight.`,
    choices: [
      {
        id: 'trust-voice',
        text: 'Trust the voice and continue following it',
        nextNodeId: 'trust-voice',
        consequences: 'The voice may be an ally... or a master manipulating you toward its own ends.'
      },
      {
        id: 'ignore-voice',
        text: 'Ignore the voice and search for another path',
        nextNodeId: 'ignore-voice',
        consequences: 'You rely on your own instincts, but may miss crucial guidance.'
      }
    ]
  },
  {
    id: 'rest',
    text: 'You find a relatively clean spot on the stone floor and sit, closing your eyes to listen to the drip of water somewhere in the distance. As you rest, you feel your strength returning. When you open your eyes, you notice a small, leather-bound book tucked beneath a nearby stone.',
    choices: [
      {
        id: 'read-book',
        text: 'Examine the mysterious book',
        nextNodeId: 'read-book',
        consequences: 'Knowledge is power, but some knowledge should remain buried.'
      },
      {
        id: 'continue-rested',
        text: 'Continue your exploration, feeling refreshed',
        nextNodeId: 'continue-rested',
        consequences: 'You press on with renewed vigor, ready for whatever comes next.'
      }
    ]
  },
  // Endings
  {
    id: 'break-seal',
    text: 'With a mighty effort, you shatter the ancient seal. The chamber trembles as a wave of dark energy washes over you. Before you stands a figure of living shadow, eyes glowing with eldritch fire. It speaks: "You have freed me, mortal. Now, you shall serve as my vessel in the world above."',
    choices: [],
    isEnding: true
  },
  {
    id: 'strengthen-seal',
    text: 'You chant the ancient words of binding, reinforcing the seal with your own life force. The symbols flare bright gold before settling into a steady, watchful glow. A sense of accomplishment fills you, though you wonder what you might have sacrificed.',
    choices: [],
    isEnding: true
  },
  {
    id: 'trust-voice',
    text: 'You place your trust in the mysterious voice. The shadowy figure steps forward, revealing itself as a tall, robed figure with eyes like polished obsidian. "Well done," it purrs. "You have proven yourself worthy. Come, let us begin your true training."',
    choices: [],
    isEnding: true
  },
  {
    id: 'ignore-voice',
    text: 'You turn away from the whispering voice and explore other parts of the chamber. In a forgotten corner, you discover a hidden cache of ancient artifacts - including a dagger that seems to drink in the light around it.',
    choices: [],
    isEnding: true
  },
  {
    id: 'read-book',
    text: 'The book is bound in what appears to be treated human skin. Its pages are filled with intricate diagrams and a language that makes your head hurt to look at. Yet, strangely, you begin to understand...',
    choices: [],
    isEnding: true
  },
  {
    id: 'continue-rested',
    text: 'Feeling refreshed, you continue your exploration. The chamber opens into a vast underground cavern where a subterranean river flows with liquid that shimmers like oil but feels icy to the touch. Strange, bioluminescent fungi cling to the walls, casting an eerie glow.',
    choices: [],
    isEnding: true
  }
];

interface StoryInterfaceProps {
  onComplete?: () => void;
}

export const StoryInterface: React.FC<StoryInterfaceProps> = ({ onComplete }) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const currentNode = storyNodes.find(node => node.id === currentNodeId);

  const handleChoice = (choiceId: string) => {
    const choice = currentNode?.choices?.find(c => c.id === choiceId);
    if (choice) setCurrentNodeId(choice.nextNodeId);
  };

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
            <div className="prose dark:prose-invert text-darkFantasy-secondary">
              {currentNode.text}
            </div>
            {onComplete && (
              <Button
                onClick={onComplete}
                className="w-full bg-darkFantasy-accent hover:bg-darkFantasy-highlight text-white font-gothic py-3"
              >
                Return to Adventure
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darkFantasy-shadow p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-darkFantasy-primary border-darkFantasy-border">
        <CardHeader>
          <CardTitle className="text-2xl font-gothic text-darkFantasy-highlight">
            Tale of the Shadow Realm
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose dark:prose-invert text-darkFantasy-secondary">
            {currentNode.text}
          </div>
          {currentNode.choices?.length > 0 && (
            <div className="space-y-3">
              {currentNode.choices.map(choice => (
                <Button
                  key={choice.id}
                  variant="outline"
                  onClick={() => handleChoice(choice.id)}
                  className="w-full text-left bg-darkFantasy-secondary/50 hover:bg-darkFantasy-secondary border-darkFantasy-border text-darkFantasy-highlight font-gothic py-3"
                >
                  <div className="flex justify-between">
                    <span>{choice.text}</span>
                    {choice.consequences && (
                      <span className="text-sm text-darkFantasy-accent italic">
                        {choice.consequences}
                      </span>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};