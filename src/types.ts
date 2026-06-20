export interface StoryNode {
  id: string;
  text: string;
  choices: StoryChoice[];
  isEnding?: boolean;
}

export interface StoryChoice {
  id: string;
  text: string;
  nextNodeId: string;
  consequences?: string;
}