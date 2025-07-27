import React, { useState } from "react";
import "./CyberKnightPanel.css";

function EquipmentSelector({ slot, onClose }) {
  const [activeTab, setActiveTab] = useState("common");

  const rarityTabs = [
    { key: "common", label: "Common (Lv 1–10)" },
    { key: "uncommon", label: "Uncommon (Lv 11–15)" },
    { key: "rare", label: "Rare (Lv 16–20)" },
    { key: "epic", label: "Epic (Lv 21–30)" },
    { key: "legendary", label: "Legendary (Lv 31–50)" },
  ];

  return (
    <div className="equipment-popup">
      <div className="equipment-header">
        <span>View Items – {slot}</span>
        <button className="close-button" onClick={onClose}>X</button>
      </div>

      <div className="rarity-tabs">
        {rarityTabs.map((tab) => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? "active-tab" : ""}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rarity-content">
        <p>Showing items for: <strong>{slot}</strong> — <em>{activeTab}</em> tier</p>
        <div style={{ padding: "10px", color: "#ccc" }}>
          <p><em>Equipment list will appear here in next update.</em></p>
        </div>
      </div>
    </div>
  );
}

export default EquipmentSelector;
