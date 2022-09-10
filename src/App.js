import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Results from './pages/Results';

import './App.css';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="game" element={<Game />} />
        <Route path="results" element={<Results />} />
      </Routes>
    </HashRouter>
  );
}
