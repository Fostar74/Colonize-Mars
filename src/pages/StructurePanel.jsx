import React, { useEffect, useState } from "react";
import "./StructurePanel.css";

const structureTypes = {
  resource: ["Gold Synthesizer", "Iron Driller", "Solar Array", "Water Extractor"],
  economy: ["Cargo Depot", "Defense Grid", "Upgrade Lab", "Bio-Lab"],
  military: ["Training Center", "Combat Simulator", "Vehicle Bay", "Drone Factory"]
};

const upgradeSlots = 2;

function StructurePanel() {
  const [activeTab, setActiveTab] = useState("resource");
  const [structureLevels, setStructureLevels] = useState(() => {
    const saved = localStorage.getItem("structureLevels");
    return saved ? JSON.parse(saved) : {};
  });
  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem("playerResources");
    return saved ? JSON.parse(saved) : {
      Gold: 10000,
      Iron: 8000,
      Water: 6000,
      Solar: 4000
    };
  });
  const [upgradeQueue, setUpgradeQueue] = useState([]);

  useEffect(() => {
    localStorage.setItem("structureLevels", JSON.stringify(structureLevels));
  }, [structureLevels]);

  useEffect(() => {
    localStorage.setItem("playerResources", JSON.stringify(resources));
  }, [resources]);

  const timeForLevel = (level) => {
    return 78 + Math.floor(((22 * 3600 + 309) - 78) * (level - 1) / 29);
  };

  const costForLevel = (level) => ({
    Gold: 100 + level * 80,
    Iron: 50 + level * 40,
    Water: 30 + level * 30,
    Solar: 20 + level * 20
  });

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const hasResources = (cost) => {
    return Object.keys(cost).every(key => resources[key] >= cost[key]);
  };

  const deductResources = (cost) => {
    setResources(prev => {
      const updated = { ...prev };
      for (let key in cost) {
        updated[key] -= cost[key];
      }
      return updated;
    });
  };

  const startUpgrade = (name) => {
    if (upgradeQueue.length >= upgradeSlots) {
      alert("Two upgrades already in progress. Please wait.");
      return;
    }
    const currentLevel = structureLevels[name] || 0;
    if (currentLevel >= 30) return;

    const level = currentLevel + 1;
    const cost = costForLevel(level);
    if (!hasResources(cost)) {
      alert("Not enough resources.");
      return;
    }
    deductResources(cost);
    const duration = timeForLevel(level);
    const startTime = Date.now();

    const upgrade = { name, level, duration, startTime };
    setUpgradeQueue((prev) => [...prev, upgrade]);

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      const percent = Math.min(100, (elapsed / duration) * 100);

      const bar = document.getElementById(`bar-${name}`);
      if (bar) bar.style.width = `${percent}%`;

      if (elapsed >= duration) {
        clearInterval(interval);
        setStructureLevels((prev) => ({
          ...prev,
          [name]: level
        }));
        setUpgradeQueue((prev) => prev.filter(u => u.name !== name));
      }
    }, 1000);
  };

  const renderBuilding = (name) => {
    const level = structureLevels[name] || 0;
    const nextLevel = level + 1;
    const cost = costForLevel(nextLevel);
    const time = formatTime(timeForLevel(nextLevel));

    return (
      <div key={name} className="building">
        <h3>{name}</h3>
        <button className="upgrade-btn" onClick={() => startUpgrade(name)}>Upgrade</button>
        <div className="progress-bar">
          <div className="progress-bar-fill" id={`bar-${name}`} />
        </div>
        <div className="level-info">
          Level: {level}<br />
          {level >= 30 ? "Max level reached." :
            `Next: Gold ${cost.Gold}, Iron ${cost.Iron}, Water ${cost.Water}, Solar ${cost.Solar} / ${time}`}
        </div>
      </div>
    );
  };

  const renderTab = (key) => (
    <div className="building-grid">
      {structureTypes[key].map(renderBuilding)}
    </div>
  );

  const renderFutureBuildings = () => (
    <div className="building-grid">
      {[
        "AI Command Nexus", "Teleportation Hub", "Nanite Foundry", "Orbital Cannon",
        "Bio-engineering Center", "Wormhole Gateway", "Stellar Port"
      ].map(name => (
        <div key={name} className="building">
          <h3>{name}</h3>
          <p style={{ opacity: 0.6 }}>Locked until future level</p>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ color: "white", padding: "10px" }}>
      <h2 style={{ textAlign: "center" }}>Structures</h2>
      <div className="subtab-buttons">
        <button onClick={() => setActiveTab("resource")}>Resources</button>
        <button onClick={() => setActiveTab("economy")}>Economy</button>
        <button onClick={() => setActiveTab("military")}>Military</button>
        <button onClick={() => setActiveTab("future")}>Future-Time Mars Buildings</button>
      </div>
      <div className="building-tab">
        {activeTab === "resource" && renderTab("resource")}
        {activeTab === "economy" && renderTab("economy")}
        {activeTab === "military" && renderTab("military")}
        {activeTab === "future" && renderFutureBuildings()}
      </div>
    </div>
  );
}

export default StructurePanel;
