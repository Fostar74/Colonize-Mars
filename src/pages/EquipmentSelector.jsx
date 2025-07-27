import React, { useState, useEffect } from "react";
import gearData from "../data/gear";
import "./CyberKnightPanel.css";

function EquipmentSelector({ slot, onClose, onEquip }) {
  const [activeTab, setActiveTab] = useState("common");
  const [inventory, setInventory] = useState([]);
  const [craftingPoints, setCraftingPoints] = useState({});

  const rarityTabs = [
    { key: "common", label: "Common (Lv 1–10)", color: "#ccc" },
    { key: "uncommon", label: "Uncommon (Lv 11–15)", color: "#4caf50" },
    { key: "rare", label: "Rare (Lv 16–20)", color: "#2196f3" },
    { key: "epic", label: "Epic (Lv 21–30)", color: "#9c27b0" },
    { key: "legendary", label: "Legendary (Lv 31–50)", color: "#ff9800" },
  ];

  const craftingCosts = {
    common: 5,
    uncommon: 10,
    rare: 15,
    epic: 20,
    legendary: 30,
  };

  useEffect(() => {
    const savedInventory = localStorage.getItem("gearInventory");
    const savedCrafting = localStorage.getItem("craftingPoints");
    if (savedInventory) setInventory(JSON.parse(savedInventory));
    if (savedCrafting) setCraftingPoints(JSON.parse(savedCrafting));
  }, []);

  useEffect(() => {
    localStorage.setItem("gearInventory", JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem("craftingPoints", JSON.stringify(craftingPoints));
  }, [craftingPoints]);

  const filteredGear = inventory.filter(
    (item) =>
      item.slot === slot.toUpperCase() &&
      item.rarity === activeTab.toLowerCase()
  );

  const handleDismantle = (item) => {
    if (!window.confirm(`Dismantle ${item.name}?`)) return;
    setInventory((prev) => prev.filter((g) => g.id !== item.id));
    const current = craftingPoints[slot] || 0;
    const added = craftingCosts[item.rarity] || 0;
    setCraftingPoints((prev) => ({
      ...prev,
      [slot]: current + added,
    }));
  };

  const handleCraft = (item) => {
    const cost = craftingCosts[item.rarity] || 0;
    const current = craftingPoints[slot] || 0;
    if (item.level >= 50 || current < cost) return;

    const updated = inventory.map((g) =>
      g.id === item.id ? { ...g, level: g.level + 1 } : g
    );
    setInventory(updated);
    setCraftingPoints((prev) => ({
      ...prev,
      [slot]: current - cost,
    }));
  };

  return (
    <div className="equipment-panel-overlay">
      <div className="equipment-panel">
        <div className="equipment-header">
          <span>VIEW {slot.toUpperCase()} ITEMS</span>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>

        <div className="rarity-tabs">
          {rarityTabs.map((tab) => (
            <button
              key={tab.key}
              className={`rarity-tab ${
                activeTab === tab.key ? "active-tab" : ""
              }`}
              onClick={() => setActiveTab(tab.key)}
              style={{
                color: tab.color,
                borderBottom:
                  activeTab === tab.key ? `2px solid ${tab.color}` : "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rarity-content">
          <div className="crafting-points">
            Crafting Points ({slot}): {craftingPoints[slot] || 0}
          </div>

          {filteredGear.length === 0 ? (
            <p style={{ color: "#ccc", marginTop: "30px" }}>
              Currently, you don't have items from the selected type. <br />
              Complete Knight missions to obtain more.
            </p>
          ) : (
            <div className="gear-list">
              {filteredGear.map((item) => (
                <div key={item.id} className="gear-item">
                  <div className="gear-name">{item.name}</div>
                  <div className="gear-bonus">{item.bonus}</div>
                  <div className="gear-level">
                    Level {item.level || item.levelRequirement} / 50
                  </div>
                  <div className="gear-actions">
                    <button
                      className="equip-button"
                      onClick={() => onEquip(slot, item)}
                    >
                      Equip
                    </button>
                    <button
                      className="dismantle-button"
                      onClick={() => handleDismantle(item)}
                    >
                      Dismantle
                    </button>
                    <button
                      className="craft-button"
                      onClick={() => handleCraft(item)}
                      disabled={
                        (item.level || item.levelRequirement) >= 50 ||
                        (craftingPoints[slot] || 0) < (craftingCosts[item.rarity] || 0)
                      }
                    >
                      Craft
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EquipmentSelector;
