import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import Game from "./pages/Game";
import Map from "./pages/Map"; // ✅ Add this line

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/game" element={<Game />} />
        <Route path="/map" element={<Map />} /> {/* ✅ Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
