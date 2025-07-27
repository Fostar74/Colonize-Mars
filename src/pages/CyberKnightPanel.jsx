import React, { useState } from "react";
import "./CyberKnightPanel.css";
import knightImage from "../images/CYBER-KNIGHT-3.png";
import EquipmentSelector from "./EquipmentSelector";

function CyberKnightPanel({ onClose }) {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotClick = (slotName) => {
    setSelectedSlot(slotName);
  };

  const closeSelector = () => {
    setSelectedSlot(null);
  };

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
            <button className="gear-slot" onClick={() => handleSlotClick("HELMET")}>HELMET</button>
            <button className="gear-slot" onClick={() => handleSlotClick("SHIELD")}>SHIELD</button>
            <button className="gear-slot" onClick={() => handleSlotClick("BOOTS")}>BOOTS</button>
            <button className="gear-slot" onClick={() => handleSlotClick("WEAPON")}>WEAPON</button>
            <button className="gear-slot" onClick={() => handleSlotClick("ARMOR")}>ARMOR</button>
            <button className="gear-slot" onClick={() => handleSlotClick("GLOVES")}>GLOVES</button>
            <button className="gear-slot" onClick={() => handleSlotClick("BELT")}>BELT</button>
          </div>
        </div>
      </div>

      {selectedSlot && (
        <EquipmentSelector slot={selectedSlot} onClose={closeSelector} />
      )}
    </div>
  );
}

export default CyberKnightPanel;
