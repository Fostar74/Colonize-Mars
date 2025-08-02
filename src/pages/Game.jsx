import React, { useEffect, useState } from "react";
import StructurePanel from "./StructurePanel";
import CyberKnightPanel from "./CyberKnightPanel";
import Quests from "./Quests";
import GameProgressManager from "../utils/gameProgress";
import "./Game.css";

function Game() {
  const [showPopup, setShowPopup] = useState(false);
  const [showCyberKnight, setShowCyberKnight] = useState(false);
  const [showQuests, setShowQuests] = useState(false);
  const [castleName, setCastleName] = useState("Headquarter");
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [gameProgress, setGameProgress] = useState(null);
  const [resources, setResources] = useState({
    gold: 10000,
    iron: 8000,
    water: 6000,
    solar: 4000,
  });
  const [isProducing, setIsProducing] = useState(false);
  const [timeUntilNextProduction, setTimeUntilNextProduction] = useState(10);
  const [showProductionNotification, setShowProductionNotification] = useState(false);
  const [totalResourcesProduced, setTotalResourcesProduced] = useState({
    gold: 0,
    iron: 0,
    water: 0,
    solar: 0,
  });
  const [isSaving, setIsSaving] = useState(false);

  const progressManager = new GameProgressManager();

  useEffect(() => {
    loadGameData();
  }, []);

  useEffect(() => {
    const resourceInterval = setInterval(async () => {
      setIsProducing(true);
      setShowProductionNotification(true);

      setResources((prevResources) => {
        const newResources = {
          gold: prevResources.gold + 10,
          iron: prevResources.iron + 10,
          water: prevResources.water + 10,
          solar: prevResources.solar + 10,
        };

        setTotalResourcesProduced((prev) => ({
          gold: prev.gold + 10,
          iron: prev.iron + 10,
          water: prev.water + 10,
          solar: prev.solar + 10,
        }));

        sessionStorage.setItem("resources", JSON.stringify(newResources));

        setIsSaving(true);
        saveGameProgress(newResources).finally(() => {
          setIsSaving(false);
        });

        return newResources;
      });

      setTimeout(() => setIsProducing(false), 1000);
      setTimeout(() => setShowProductionNotification(false), 3000);
    }, 10000);

    const countdownInterval = setInterval(() => {
      setTimeUntilNextProduction((prev) => (prev <= 1 ? 10 : prev - 1));
    }, 1000);

    return () => {
      clearInterval(resourceInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  const loadGameData = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const username = sessionStorage.getItem("username");

      if (!userId || !username) {
        alert("Please login first!");
        window.location.href = "/#/";
        return;
      }

      progressManager.setUserInfo(userId, username);

      const serverData = await progressManager.loadProgress();
      if (serverData && serverData.gameProgress) {
        setGameProgress(serverData.gameProgress);
        if (serverData.gameProgress.castle) {
          setCastleName(`Headquarter (${serverData.gameProgress.castle.x}:${serverData.gameProgress.castle.y})`);
        }
        if (serverData.gameProgress.resources) {
          setResources(serverData.gameProgress.resources);
        }

        sessionStorage.setItem("castle", JSON.stringify(serverData.gameProgress.castle));
        sessionStorage.setItem("resources", JSON.stringify(serverData.gameProgress.resources));
        sessionStorage.setItem("structures", JSON.stringify(serverData.gameProgress.structures));
      } else {
        const sessionCastle = sessionStorage.getItem("castle");
        const sessionResources = sessionStorage.getItem("resources");

        if (sessionCastle) {
          const castle = JSON.parse(sessionCastle);
          setCastleName(`Headquarter (${castle.x}:${castle.y})`);
        }
        if (sessionResources) {
          setResources(JSON.parse(sessionResources));
        }
      }

      if (userId) {
        const gameStats = await progressManager.getGameStats(userId);
        if (gameStats) console.log("📊 Status loaded:", gameStats);
      }
    } catch (error) {
      console.error("Error loading game data:", error);
    }
  };

  const saveGameProgress = async (newResources = null, newStructures = null) => {
    try {
      const currentCastle = JSON.parse(sessionStorage.getItem("castle") || "{}");
      const currentResources = newResources || resources;
      const currentStructures = newStructures || JSON.parse(sessionStorage.getItem("structures") || "{}");

      sessionStorage.setItem("castle", JSON.stringify(currentCastle));
      sessionStorage.setItem("resources", JSON.stringify(currentResources));
      sessionStorage.setItem("structures", JSON.stringify(currentStructures));

      const saveResult = await progressManager.saveProgress(currentCastle, currentResources, currentStructures);

      if (saveResult) {
        const userId = sessionStorage.getItem("userId");
        if (userId) {
          const totalProduced =
            totalResourcesProduced.gold +
            totalResourcesProduced.iron +
            totalResourcesProduced.water +
            totalResourcesProduced.solar;
          await progressManager.updateGameStats(userId, 0, totalProduced, 0);
        }
        console.log("✅ Progress saved!");
      } else {
        console.warn("⚠️ Error on saving progress");
      }
    } catch (error) {
      console.error("❌ Error on saving Progress:", error);
    }
  };

  const logout = () => {
    saveGameProgress();
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div
      className="game-container"
      style={{
        backgroundImage: 'url("/images/mars_background.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        minHeight: "100vh",
      }}
    >
      <div className="top-resource-bar">
        {["gold", "iron", "water", "solar"].map((res) => (
          <div key={res} className={`resource-item ${isProducing ? "producing" : ""}`}>
            <div className={`resource-icon ${res}-icon`}></div>
            <span>{res.charAt(0).toUpperCase() + res.slice(1)}: {resources[res].toLocaleString()}</span>
          </div>
        ))}
        <div className="production-timer">
          <span>⏰ Next Generation: {timeUntilNextProduction}s</span>
        </div>
        {isSaving && <div className="saving-indicator"><span>💾 Saving...</span></div>}
      </div>

      <div className="castle-top-bar">
        <button className="castle-name-btn" onClick={() => setShowPopup(true)}>{castleName}</button>
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
            <button className="close-button" onClick={() => setShowPopup(false)}>X</button>
          </div>
          <div className="popup-content">
            <div className="popup-section active">
              <button className="back-button" onClick={() => setShowPopup(false)}>← Back</button>
              <StructurePanel />
            </div>
          </div>
        </div>
      )}

      {showCyberKnight && <CyberKnightPanel onClose={() => setShowCyberKnight(false)} />}

      {showQuests && (
        <div className="popup">
          <div className="popup-header">
            <span>QUESTS</span>
            <button className="close-button" onClick={() => setShowQuests(false)}>X</button>
          </div>
          <Quests />
        </div>
      )}

      {showProductionNotification && (
        <div className="production-notification">
          <div className="notification-content">
            <span>+10 Gold, +10 Iron, +10 Water, +10 Solar</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
