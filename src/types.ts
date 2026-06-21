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
  requiredStat?: 'strength' | 'intelligence' | 'agility' | 'charisma';
  requiredStatValue?: number;
  rewardItem?: {
    id: string;
    name: string;
    type: 'weapon' | 'armor' | 'consumable' | 'quest' | 'misc';
    description: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  };
  rewardSpell?: {
    id: string;
    name: string;
    description: string;
    color: string;
  };
}