# 🌑 Rise of the Shadowbound

**A Dark Fantasy Interactive Experience**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/UI-shadcn-000000?logo=radix-ui)](https://ui.shadcn.com)

Rise of the Shadowbound is an immersive web application that blends interactive storytelling with RPG elements and mini-games. Set in a world of oppressive shadows and forbidden magic, players forge their own dark destiny through a series of critical choices and trials.

## ✨ Key Features

### 🎭 Character Forging
Create a unique dark hero by selecting from specialized classes like the **Shadowblade** or **Arcanist**. Customize core attributes (Strength, Intelligence, Agility, Charisma) and embrace forbidden traits to shape how you interact with the world.

### 📖 Branching Narrative & Master RPG Interface
Experience a rich, choice-driven story. The **Story Page** features a master split-screen RPG dashboard:
- **Left Column**: The branching narrative engine where every decision leads to different paths.
- **Right Column (Hero's Sanctum)**: A tabbed companion panel displaying your character profile, active inventory, and spellbook in real-time.

### 🎮 Arcane Mini-Games
Test your wit and memory with themed challenges:
- **Trivia Night**: Prove your knowledge of the arcane.
- **Memory Match**: Sharpen your mind to survive the void by matching ancient runes.
- *Integrated scoring system that persists across sessions and is tied to your active character.*

### 📊 Soul Dashboard
Track your journey through the shadows. The dashboard monitors your time spent in the realm and archives your highest scores from the various trials.

## 🛠️ Technical Architecture

### The Stack
- **Frontend**: React 19 with TypeScript for type-safe, scalable development.
- **Styling**: Tailwind CSS utilizing a custom `darkFantasy` color palette for a cohesive, atmospheric aesthetic.
- **UI Components**: Built upon **shadcn/ui** and **Radix UI** for high accessibility and polished interactions.
- **Routing**: React Router v6 for seamless navigation between the story, games, and dashboard.
- **Persistence**: LocalStorage API for saving character progress and game statistics.

### Design Philosophy
- **Atmospheric UI**: Custom gothic typography and a deep purple/obsidian color scheme.
- **Accessibility First**: Implementation of skip links, ARIA live regions for dynamic events, and high-contrast ratios.
- **Mobile-First**: Fully responsive layout ensuring the darkness is accessible on any device.

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/dark-fantasy-app.git
   cd dark-fantasy-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Launch the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080`

## 📁 Project Structure

```text
src/
├── components/       # Atomic UI components
│   ├── game/         # Story, Character Creator, Magic System, Inventory
│   ├── ui/           # shadcn/ui base components
│   └── accessibility/# A11y helpers (SkipLinks, etc.)
├── pages/            # Route-level views (Dashboard, Games, Index)
├── hooks/            # Custom React hooks for game logic
├── lib/              # Utility functions and Tailwind merges
├── types.ts          # Global TypeScript interfaces
└── App.tsx           # Main routing configuration
```

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

---
*Forged in the depths of the void. May the shadows guide you.*