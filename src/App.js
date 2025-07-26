import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import Game from "./pages/Game";
import map from "./pages/map"; // ✅ lowercase import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/game" element={<Game />} />
        <Route path="/map" element={<map />} />
      </Routes>
    </Router>
  );
}

export default App;
