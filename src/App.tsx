import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import Settings from "./pages/Settings";
import GameTrivia from "./pages/GameTrivia";
import GameMemory from "./pages/GameMemory";
import Index from "./pages/Index";
import Layout from "./components/Layout";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LoadingSpinner } from "./components/LoadingSpinner";
import CharacterCreatorPage from "./pages/CharacterCreatorPage";
import StoryPage from "./pages/StoryPage";
import CombatArena from "./pages/CombatArena";
import SoulForge from "./pages/SoulForge";
import QuestLogPage from "./pages/QuestLogPage";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Suspense fallback={<LoadingSpinner size="lg" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/games" element={<Games />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/games/trivia" element={<GameTrivia />} />
              <Route path="/games/memory" element={<GameMemory />} />
              <Route path="/character" element={<CharacterCreatorPage />} />
              <Route path="/story" element={<StoryPage />} />
              <Route path="/combat" element={<CombatArena />} />
              <Route path="/forge" element={<SoulForge />} />
              <Route path="/quests" element={<QuestLogPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;