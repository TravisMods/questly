import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Admin from './pages/Admin';
import Founder from './pages/Founder';
import Host from './pages/Host';
import Player from './pages/Player';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/founder" element={<Founder />} />
      <Route path="/host" element={<Host />} />
      <Route path="/player" element={<Player />} />
    </Routes>
  </BrowserRouter>
);
