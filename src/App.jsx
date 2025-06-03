import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Add other routes here if needed */}
    </Routes>
  );
}

export default App;
