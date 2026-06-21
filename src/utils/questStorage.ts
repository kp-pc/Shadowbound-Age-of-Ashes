import { loadCharacter } from "./characterStorage";
import { loadStats } from "./storage";
import { loadStoryProgress } from "./storyStorage";

export interface Quest {
  id: string;
  title: string;
  description: string;
  objective: string;
  reward: string;
  status: "active" | "completed";
  progressPercent: number;
}

export const getQuests = (): Quest[] => {
  const character = loadCharacter();
  const stats = loadStats();
  const scores = stats.scores || {};
  const todayTime = stats[new Date().toISOString().split("T")[0]] || 0;

  const questList: Quest[] = [
    {
      id: "forge-hero",
      title: "Awaken the vessel",
      description: "You must forge a dark hero to host your soul within this oppressive twilight realm.",
      objective: "Create your character in the Character Creator",
      reward: "Unlocks Personalized Soul Shards & Combat Arena",
      status: character ? "completed" : "active",
      progressPercent: character ? 100 : 0,
    },
    {
      id: "arcane-intellect",
      title: "Scholar of Forbidden Secrets",
      description: "Test your intellect against the cryptic questions of the trivia void.",
      objective: "Achieve a score of 30 or higher in Trivia Night",
      reward: "+100 Soul Shards",
      status: (scores[`${character?.name}:trivia`] >= 30 || scores["trivia"] >= 30) ? "completed" : "active",
      progressPercent: Math.min(100, Math.floor(((scores[`${character?.name}:trivia`] || scores["trivia"] || 0) / 30) * 100)),
    },
    {
      id: "rune-weaver",
      title: "Reticule of the Mind",
      description: "Sharpen your sensory focus to successfully map the matching ancient runes.",
      objective: "Complete at least one Memory Match Trial",
      reward: "+150 Soul Shards",
      status: (scores[`${character?.name}:memory`] > 0 || scores["memory"] > 0) ? "completed" : "active",
      progressPercent: (scores[`${character?.name}:memory`] > 0 || scores["memory"] > 0) ? 100 : 0,
    },
    {
      id: "slay-monsters",
      title: "Beast Slayer of the Abyss",
      description: "Purge the wandering void aberrations lurking inside the Shadow Arena.",
      objective: "Gain at least 50 points of Combat Arena essence",
      reward: "+1 Attribute stat boost",
      status: (scores[`${character?.name}:combat`] >= 50 || scores["combat"] >= 50) ? "completed" : "active",
      progressPercent: Math.min(100, Math.floor(((scores[`${character?.name}:combat`] || scores["combat"] || 0) / 50) * 100)),
    },
    {
      id: "chronicle-time",
      title: "Endure the Shadow's Chill",
      description: "Survive and linger inside this dark dimension to attune with the twilight atmosphere.",
      objective: "Accumulate 120 seconds of spent time today",
      reward: "+50 Net Shards",
      status: todayTime >= 120 ? "completed" : "active",
      progressPercent: Math.min(100, Math.floor((todayTime / 120) * 100)),
    }
  ];

  return questList;
};