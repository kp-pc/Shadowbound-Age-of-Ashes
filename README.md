# 🌑 Rise of the Shadowbound

**A Dark Fantasy Interactive Experience**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/UI-shadcn-000000?logo=radix-ui)](https://ui.shadcn.com)

Rise of the Shadowbound is an immersive web application that blends interactive storytelling with RPG elements, turn-based combat, and arcane mini-games. Set in a world of oppressive shadows and forbidden magic, players forge their own dark destiny through critical choices, dynamic combat encounters, and cosmic trials.

## ✨ Key Features

### 🎭 Character Forging
Create a unique dark hero by selecting from specialized classes like the **Shadowblade** or **Arcanist**. Customize core attributes (Strength, Intelligence, Agility, Charisma) and embrace forbidden dark traits to shape how you interact with the world.

### 📖 Branching Narrative & Master RPG Interface
Experience a choice-driven story. The **Story Page** features a master split-screen companion layout:
- **Left Column**: The branching narrative engine where every decision branches into different paths.
- **Right Column (Hero's Sanctum)**: A tabbed companion panel displaying your character profile, active inventory, spellbook, and active quests in real-time.

### ⚔️ Turn-Based Combat Arena (Shadow Arena)
Test your attributes in the **Shadow Beast Arena**. Encounter randomly generated void monsters and engage in responsive turn-based combat:
- Use physical **Strikes** scaling with your Strength.
- Raise **Void Shields** or block with your Agility.
- Cast **Blood Flame** and **Shadow Bolts** unlocked directly from story scrolls or the Soul Forge.
- Harvest defeated beast souls for **Soul Shards**.

### 🧪 The Soul Forge (Arcane Merchant)
Sacrifice your harvested Soul Shards at **The Soul Forge** to:
- Purchase legendary **Elixirs** to permanently buff stats (Strength, Intelligence, Agility, Charisma).
- Unlock dangerous high-tier **Spell scrolls** like the *Scroll of Spectral Wind*.
- Forge legendary armaments like the *Scythe of the Harvester* and *Doomlord's Signet*.

### 📜 Dynamic Quest Log System
Keep track of your fate with an integrated **Quest Journal**:
- Auto-tracks objectives like survival time spent, high-tier combat accomplishments, character creation, and trivia scores.
- Live-updating progress bars.
- Filterable tabs for **Active** and **Completed** quests.
- Accessible directly within the navigation bar, dashboard, and the story companion panel.

### 🎮 Arcane Mini-Games
Test your wit and memory with themed challenges:
- **Trivia Night**: Prove your knowledge of forbidden lore.
- **Memory Match**: Sharpen your focus by matching ancient runes before they vanish.

## 🛠️ Technical Architecture

### The Stack
- **Frontend**: React 19 with TypeScript for type-safe, scalable development.
- **Styling**: Tailwind CSS utilizing a custom `darkFantasy` color palette for a cohesive, atmospheric aesthetic.
- **UI Components**: Built upon **shadcn/ui** and **Radix UI** for high accessibility and polished interactions.
- **Routing**: React Router v6 for seamless navigation.
- **Persistence**: LocalStorage API for saving character progress, spells, inventory, and quest statistics.

---
*Forged in the depths of the void. May the shadows guide you.*