import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginRegister from "./LoginRegister";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* В бъдеще може да добавим: <Route path="/game" element={<Game />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
