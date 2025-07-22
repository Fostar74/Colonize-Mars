import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister"; // ✅ Do NOT add .jsx here
import Game from "./pages/Game";                   // ✅ Do NOT add .jsx here

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
