import React, { useState } from "react";
import "./Quests.css";

const Quests = () => {
  const [mainQuestCompleted, setMainQuestCompleted] = useState(false);
  const [cyberKnightLevel, setCyberKnightLevel] = useState(1);
  const [gatheredMine, setGatheredMine] = useState(false);

  const handleMainQuest = () => setMainQuestCompleted(true);
  const handleLevelUpKnight = () => setCyberKnightLevel(2);
  const handleGatherMine = () => setGatheredMine(true);

  return (
    <div className="quests-container">
      <h2>Quests</h2>

      <div className="quest-section">
        <h3>Main Quest</h3>
        <div className="quest-box">
          <div className="quest-title">Upgrade all production buildings to level 3</div>
          <div className="quest-progress">{mainQuestCompleted ? "4 / 4" : "0 / 4"}</div>
          <div className="quest-rewards">
            <span>500</span><img src="/images/gold-icon.png" alt="Gold" />
            <span>500</span><img src="/images/iron-icon.png" alt="Iron" />
            <span>500</span><img src="/images/wood-icon.png" alt="Wood" />
            <span>500</span><img src="/images/food-icon.png" alt="Food" />
          </div>
          <button onClick={handleMainQuest}>Show Me</button>
        </div>
      </div>

      <div className="quest-section">
        <h3>Side Quests</h3>

        <div className="quest-box">
          <div className="quest-title">Level up your Cyber Knight to level 2</div>
          <div className="quest-progress">{cyberKnightLevel >= 2 ? "2 / 2" : "1 / 2"}</div>
          <div className="quest-rewards">
            <img src="/images/speedup-icon.png" alt="Speedup" /> x1
            <img src="/images/armor-icon.png" alt="Armor" /> x25
            <img src="/images/gloves-icon.png" alt="Gloves" /> x25
            <img src="/images/boots-icon.png" alt="Boots" /> x25
          </div>
          <button onClick={handleLevelUpKnight}>Show Me</button>
        </div>

        <div className="quest-box">
          <div className="quest-title">Gather from 1 independent map mine</div>
          <div className="quest-progress">{gatheredMine ? "1 / 1" : "0 / 1"}</div>
          <div className="quest-rewards">
            <img src="/images/boost-icon.png" alt="Boost" /> x1 (2h)
            <img src="/images/forge-token-icon.png" alt="Forge Token" /> x50
          </div>
          <button onClick={handleGatherMine}>Show Me</button>
        </div>
      </div>
    </div>
  );
};

export default Quests;
