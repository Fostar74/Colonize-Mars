import React from "react";
import "./CyberKnightPanel.css";
import knightImage from "../images/CYBER-KNIGHT-3.png";

function CyberKnightPanel({ onClose }) {
  return (
    <div className="cyber-panel-overlay">
      <div className="cyber-panel">
        <div className="cyber-panel-header">
          <h2>Cyber Knight CONTROL PANEL</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>

        <div className="cyber-panel-body">
          <div className="cyber-image-container">
            <img src={knightImage} alt="Cyber Knight" className="cyber-image" />
          </div>

          <div className="equipment-slots">
            <button className="gear-slot">HELMET</button>
            <button className="gear-slot">SHIELD</button>
            <button className="gear-slot">BOOTS</button>
            <button className="gear-slot">WEAPON</button>
            <button className="gear-slot">ARMOR</button>
            <button className="gear-slot">GLOVES</button>
            <button className="gear-slot">BELT</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CyberKnightPanel;
