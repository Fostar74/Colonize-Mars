import React, { useState, useEffect } from "react";
import "./CyberKnightPanel.css";
import knightImage from "../images/CYBER-KNIGHT-3.png";
import EquipmentSelector from "./EquipmentSelector";

function CyberKnightPanel({ onClose }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [equippedItems, setEquippedItems] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("equippedItems");
    if (saved) {
      setEquippedItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("equippedItems", JSON.stringify(equippedItems));
  }, [equippedItems]);

  const handleSlotClick = (slotName) => {
    setSelectedSlot(slotName);
  };

  const closeSelector = () => {
    setSelectedSlot(null);
  };

  const handleEquip = (slot, item) => {
    setEquippedItems((prev) => ({
      ...prev,
      [slot]: item,
    }));
    closeSelector();
  };

  const gearSlots = [
    "HELMET",
    "SHIELD",
    "BOOTS",
    "WEAPON",
    "ARMOR",
    "GLOVES",
    "BELT",
  ];

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
            <img
              src={knightImage}
              alt="Cyber Knight"
              className="cyber-image"
            />
          </div>

          <div className="equipment-slots">
            {gearSlots.map((slot) => (
              <div key={slot} className="gear-slot-wrapper">
                <button
                  className="gear-slot"
                  onClick={() => handleSlotClick(slot)}
                >
                  {slot}
                </button>
                {equippedItems[slot] && (
                  <div className="equipped-label">
                    {equippedItems[slot].name}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedSlot && (
        <EquipmentSelector
          slot={selectedSlot}
          onClose={closeSelector}
          onEquip={handleEquip}
        />
      )}
    </div>
  );
}

export default CyberKnightPanel;
