import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegister from "./LoginRegister";
import Game from "./pages/Game"; // ✅ new file

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/game" element={<Game />} /> {/* ✅ Game screen */}
      </Routes>
    </Router>
  );
}

export default App;
