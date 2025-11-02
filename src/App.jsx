import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
