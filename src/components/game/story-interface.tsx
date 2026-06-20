import { StoryNode } from '@/types';

export const storyNodes: StoryNode[] = [
  {
    id: 'voice',
    text: 'The whispering voice grows clearer as you follow it: "Seek the Obsidian Altar, where the moon\\'s blood flows freely. There, your true nature will be revealed." The voice seems to come from a shadowy figure just beyond the torchlight.',
    choices: [
      {
        id: 'trust-voice',
        text: 'You place your trust in the mysterious voice. The shadowy figure steps forward, revealing itself as a tall, robed figure with eyes like polished obsidian. "Well done," it purrs. "You have proven yourself worthy. Come, let us begin your true training."',
        choices: [],
        isEnding: true,
      },
      {
        id: 'ignore-voice',
        text: 'You turn away from the whispering voice and explore other parts of the chamber. In a forgotten corner, you discover a hidden cache of ancient artifacts - including a dagger that seems to drink in the light around it.',
        choices: [],
        isEnding: true,
      },
      {
        id: 'read-book',
        text: 'The book is bound in what appears to be treated human skin. Its pages are filled with intricate diagrams and a language that makes your head hurt to look at. Yet, strangely, you begin to understand...',
        choices: [],
        isEnding: true,
      },
      {
        id: 'continue-rested',
        text: 'Feeling refreshed, you continue your exploration. The chamber opens into a vast underground cavern where a subterranean river flows with liquid that shimmers like oil but feels icy to the touch. Strange, bioluminescent fungi cling to the walls, casting an eerie glow.',
        choices: [],
        isEnding: true,
      },
    ],
  },
  {
    // Endings
    break-seal: {
      id: 'break-seal',
      text: 'With a mighty effort, you shatter the ancient seal. The chamber trembles as a wave of dark energy washes over you. Before you stands a figure of living shadow, eyes glowing with eldritch fire. It speaks: "You have freed me, mortal. Now, you shall serve as my vessel in the world above."',
      choices: [],
      isEnding: true,
    },
    strengthen-seal: {
      id: 'strengthen-seal',
      text: 'You chant the ancient words of binding, reinforcing the seal with your own life force. The symbols flare bright gold before settling into a steady, watchful glow. A sense of accomplishment fills you, though you wonder what you might have sacrificed.',
      choices: [],
      isEnding: true,
    },
    trust-voice: {
      id: 'trust-voice',
      text: 'You place your trust in the mysterious voice. The shadowy figure steps forward, revealing itself as a tall, robed figure with eyes like polished obsidian. "Well done," it purrs. "You have proven yourself worthy. Come, let us begin your true training."',
      choices: [],
      isEnding: true,
    },
    ignore-voice: {
      id: 'ignore-voice',
      text: 'You turn away from the whispering voice and explore other parts of the chamber. In a forgotten corner, you discover a hidden cache of ancient artifacts - including a dagger that seems to drink in the light around it.',
      choices: [],
      isEnding: true,
    },
    read-book: {
      id: 'read-book',
      text: 'The book is bound in what appears to be treated human skin. Its pages are filled with intricate diagrams and a language that makes your head hurt to look at. Yet, strangely, you begin to understand...',
      choices: [],
      isEnding: true,
    },
    continue-rested: {
      id: 'continue-rested',
      text: 'Feeling refreshed, you continue your exploration. The chamber opens into a vast underground cavern where a subterranean river flows with liquid that shimmers like oil but feels icy to the touch. Strange, bioluminescent fungi cling to the walls, casting an eerie glow.',
      choices: [],
      isEnding: true,
    },
  },
  {
    // Resting
    continue-rested: {
      id: 'continue-rested',
      text: 'Feeling refreshed, you continue your exploration. The chamber opens into a vast underground cavern where a subterranean river flows with liquid that shimmers like oil but feels icy to the touch. Strange, bioluminescent fungi cling to the walls, casting an eerie glow.',
      choices: [],
      isEnding: true,
    },
  },
];