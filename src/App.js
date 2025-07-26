import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import Game from "./pages/Game";
import Map from "./pages/Map"; // ✅ lowercase import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/game" element={<Game />} />
        <Route path="/Map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
