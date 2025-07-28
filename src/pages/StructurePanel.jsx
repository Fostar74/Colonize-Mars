import React, { useEffect, useState } from "react";
import "./StructurePanel.css";
import goldIcon from "../images/gold.png";
import ironIcon from "../images/iron.png";
import waterIcon from "../images/water.png";
import solarIcon from "../images/solar.png";

const structureTypes = {
  resource: ["Gold Synthesizer", "Iron Driller", "Solar Array", "Water Extractor"],
  economy: ["Cargo Depot", "Defense Grid", "Upgrade Lab", "Bio-Lab"],
  military: ["Training Center", "Combat Simulator", "Vehicle Bay", "Drone Factory"]
};

const upgradeSlots = 2;

const unitCategories = {
  "Ground Units": ["Explorer Trooper", "Exo-Soldier", "Plasma Bladesman", "Nano Shieldman"],
  "Ranged Specialists": ["Railgunner", "Pulse Sniper", "Drone Operator"],
  "Mobile Units": ["Rover Scout", "Hoverbike Rider", "Mech Walker", "Hover Drone Rider"],
  "Heavy Systems": ["Demolition Bot", "Missile Carrier", "Particle Blaster", "Orbital Strike Beacon"],
  "Elite / Nation-Specific": ["Martian Noble", "AI General", "Gene Warrior"]
};

function StructurePanel() {
  const [activeTab, setActiveTab] = useState("resource");
  const [unitTab, setUnitTab] = useState("Ground Units");
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
  const [trainAmounts, setTrainAmounts] = useState({});

  useEffect(() => {
    localStorage.setItem("structureLevels", JSON.stringify(structureLevels));
  }, [structureLevels]);

  useEffect(() => {
    localStorage.setItem("playerResources", JSON.stringify(resources));
  }, [resources]);

  const timeForUnits = (qty) => {
    const base = 30; // seconds per unit
    return qty * base;
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const unitCost = {
    Gold: 100,
    Iron: 80,
    Water: 60,
    Solar: 40
  };

  const calculateMaxTrainable = () => {
    const limits = Object.entries(unitCost).map(([res, cost]) =>
      Math.floor(resources[res] / cost)
    );
    return Math.max(0, Math.min(...limits));
  };

  const handlePresetClick = (unit, fraction) => {
    const max = calculateMaxTrainable();
    setTrainAmounts((prev) => ({
      ...prev,
      [unit]: Math.floor(max * fraction)
    }));
  };

  const renderUnitCard = (unit) => {
    const qty = Number(trainAmounts[unit]) || 0;
    const time = formatTime(timeForUnits(qty));

    return (
      <div key={unit} className="unit-card">
        <h4>{unit}</h4>

        <div className="train-slider">
          <button onClick={() => handlePresetClick(unit, 0)}>–</button>
          <button onClick={() => handlePresetClick(unit, 0.25)}>1/4</button>
          <button onClick={() => handlePresetClick(unit, 0.5)}>1/2</button>
          <button onClick={() => handlePresetClick(unit, 0.75)}>3/4</button>
          <button onClick={() => handlePresetClick(unit, 1)}>+ MAX</button>
        </div>

        <p style={{ marginTop: 6 }}>Train Time: {time}</p>

        <div className="resource-row">
          <div className="resource-cost">
            <img src={goldIcon} alt="Gold" />
            <span>{unitCost.Gold}</span>
          </div>
          <div className="resource-cost">
            <img src={ironIcon} alt="Iron" />
            <span>{unitCost.Iron}</span>
          </div>
          <div className="resource-cost">
            <img src={waterIcon} alt="Water" />
            <span>{unitCost.Water}</span>
          </div>
          <div className="resource-cost">
            <img src={solarIcon} alt="Solar" />
            <span>{unitCost.Solar}</span>
          </div>
        </div>

        <button style={{ marginTop: 10 }}>Train</button>
      </div>
    );
  };

  const renderUnitPanel = () => (
    <div>
      <div className="subtab-buttons">
        {Object.keys(unitCategories).map((category) => (
          <button key={category} onClick={() => setUnitTab(category)}>
            {category}
          </button>
        ))}
      </div>
      <div className="unit-grid">
        {unitCategories[unitTab].map(renderUnitCard)}
      </div>
    </div>
  );

  const renderUpgradesPanel = () => (
    <div style={{ textAlign: "center", marginTop: "20px", color: "#ccc" }}>
      <h3>Global Upgrades Panel</h3>
      <p>Coming soon: enhance unit power, training speed, resource production, and more.</p>
    </div>
  );

  const renderBuilding = (name) => {
    const level = structureLevels[name] || 0;
    const nextLevel = level + 1;
    const cost = {
      Gold: 100 + level * 80,
      Iron: 50 + level * 40,
      Water: 30 + level * 30,
      Solar: 20 + level * 20
    };
    const time = formatTime(78 + Math.floor(((22 * 3600 + 309) - 78) * (nextLevel - 1) / 29));

    return (
      <div key={name} className="building">
        <h3>{name}</h3>
        <button className="upgrade-btn" onClick={() => alert("Upgrade coming soon")}>Upgrade</button>
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

  const renderFutureEra = () => (
    <div style={{ textAlign: "center", color: "#ccc", marginTop: "20px" }}>
      <h3>🔒 Future Era</h3>
      <p>Unlocks new buildings and units at Player Level 40</p>
    </div>
  );

  return (
    <div style={{ color: "white", padding: "10px" }}>
      <h2 style={{ textAlign: "center" }}>Base Control Panel</h2>
      <div className="subtab-buttons">
        <button onClick={() => setActiveTab("resource")}>Resources</button>
        <button onClick={() => setActiveTab("economy")}>Economy</button>
        <button onClick={() => setActiveTab("military")}>Military</button>
        <button onClick={() => setActiveTab("units")}>Units</button>
        <button onClick={() => setActiveTab("upgrades")}>Upgrades</button>
        <button onClick={() => setActiveTab("future")}>Future Era</button>
      </div>

      <div className="building-tab">
        {activeTab === "resource" && renderTab("resource")}
        {activeTab === "economy" && renderTab("economy")}
        {activeTab === "military" && renderTab("military")}
        {activeTab === "units" && renderUnitPanel()}
        {activeTab === "upgrades" && renderUpgradesPanel()}
        {activeTab === "future" && renderFutureEra()}
      </div>
    </div>
  );
}

export default StructurePanel;
