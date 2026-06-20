import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'; // To be created
import Games from './pages/Games'; // To be created
import Settings from './pages/Settings'; // To be created

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Dashboard /> />>
        <Route path="/games" element={<Games /> />>
        <Route path="/settings" element={<Settings /> />>
        <Route path="/games/:gameId" element={({ params }) => {
          // Game-specific routing logic
          return <div>Game: {params.gameId}</div>;
        }} />
      </Routes>
    </Router>
  );
}

export default App;