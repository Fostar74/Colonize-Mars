import React, { useEffect, useState } from "react";
import StructurePanel from "./StructurePanel";
import CyberKnightPanel from "./CyberKnightPanel";
import Quests from "./Quests";
import "./Game.css";

function Game() {
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("structures");
  const [castleName, setCastleName] = useState("Headquarter");
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [showCyberKnight, setShowCyberKnight] = useState(false);
  const [showQuests, setShowQuests] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("castle");
    if (saved) {
      const castle = JSON.parse(saved);
      setCastleName(`Headquarter (${castle.x}:${castle.y})`);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const showTab = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div
      className="game-container"
      style={{
        backgroundImage: 'url("/images/mars-background.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        minHeight: "100vh",
      }}
    >
      <div className="top-resource-bar">
        <div>Gold: 10000</div>
        <div>Iron: 8000</div>
        <div>Water: 6000</div>
        <div>Solar: 4000</div>
      </div>

      <div className="castle-top-bar">
        <button className="castle-name-btn" onClick={() => setShowPopup(true)}>
          {castleName}
        </button>
      </div>

      <div className="bottom-bar">
        <button onClick={() => setShowCyberKnight(true)}>Cyber Knight</button>
        <button onClick={() => setShowQuests(true)}>Quests</button>
        <button>Campaign</button>
        <button onClick={() => (window.location.href = "/#/map")}>Map</button>
        <button>Alliance</button>
        <button>Messages</button>
        <button>Inventory</button>
        <button onClick={() => setOptionsVisible(!optionsVisible)}>Options</button>
      </div>

      {optionsVisible && (
        <div id="optionsMenu">
          <button onClick={logout}>Log Out</button>
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <div className="popup-header">
            <span>BASE CONTROL PANEL</span>
            <button className="close-button" onClick={() => setShowPopup(false)}>
              X
            </button>
          </div>
          <div className="popup-content">
            <StructurePanel />
          </div>
        </div>
      )}

      {showCyberKnight && (
        <CyberKnightPanel onClose={() => setShowCyberKnight(false)} />
      )}

      {showQuests && (
        <div className="popup">
          <div className="popup-header">
            <span>QUESTS</span>
            <button className="close-button" onClick={() => setShowQuests(false)}>
              X
            </button>
          </div>
          <div className="popup-content">
            <Quests />
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
