import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Games from './pages/Games';
import Settings from './pages/Settings';
import GameTrivia from './pages/GameTrivia';
import GameMemory from './pages/GameMemory';
import Index from './pages/Index';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/games" element={<Games />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/games/trivia" element={<GameTrivia />} />
          <Route path="/games/memory" element={<GameMemory />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;