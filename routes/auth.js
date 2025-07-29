const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const DatabaseManager = require("../database/database");

const db = new DatabaseManager();

router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUserByEmail = db.findUserByEmail(email);
    if (existingUserByEmail) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    const existingUserByUsername = db.findUserByUsername(username);
    if (existingUserByUsername) {
      return res.status(409).json({ message: "Username is already taken." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = db.createUser(email, username, hashedPassword);

    res.status(201).json({
      message: "Registration successful!",
      userId: result.userId,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error during registration." });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required." });
  }

  try {
    const user = db.findUserByUsername(username);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const gameProgress = db.getGameProgress(user.id);
    const gameStats = db.getGameStats(user.id);

    res.status(200).json({
      message: "Login successful!",
      username: user.username,
      userId: user.id,
      gameProgress: gameProgress,
      gameStats: gameStats,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error during login." });
  }
});

router.post("/save-progress", async (req, res) => {
  const { userId, castleData, resources, structures } = req.body;

  if (!userId || !castleData || !resources || !structures) {
    return res.status(400).json({ message: "All game data is required." });
  }

  try {
    const user = db.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    db.saveGameProgress(userId, castleData, resources, structures);

    res.status(200).json({ message: "Game progress saved successfully!" });
  } catch (error) {
    console.error("Save progress error:", error);
    res.status(500).json({ message: "Internal server error while saving progress." });
  }
});

router.get("/get-progress/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = db.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const gameProgress = db.getGameProgress(userId);
    const gameStats = db.getGameStats(userId);

    res.status(200).json({
      gameProgress: gameProgress,
      gameStats: gameStats,
    });
  } catch (error) {
    console.error("Get progress error:", error);
    res.status(500).json({ message: "Internal server error while getting progress." });
  }
});

router.post("/update-stats", async (req, res) => {
  const { userId, playTime, resourcesMined, structuresBuilt } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const user = db.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    db.updateGameStats(userId, playTime || 0, resourcesMined || 0, structuresBuilt || 0);

    res.status(200).json({ message: "Game stats updated successfully!" });
  } catch (error) {
    console.error("Update stats error:", error);
    res.status(500).json({ message: "Internal server error while updating stats." });
  }
});

router.post("/save-equipment", async (req, res) => {
  const { userId, equippedItems, gearInventory, craftingPoints } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const user = db.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    db.saveUserEquipment(userId, equippedItems || {}, gearInventory || [], craftingPoints || {});

    res.status(200).json({ message: "Equipment saved successfully!" });
  } catch (error) {
    console.error("Save equipment error:", error);
    res.status(500).json({ message: "Internal server error while saving equipment." });
  }
});

router.get("/get-equipment/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = db.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const equipment = db.getUserEquipment(userId);

    res.status(200).json({
      equipment: equipment,
    });
  } catch (error) {
    console.error("Get equipment error:", error);
    res.status(500).json({ message: "Internal server error while getting equipment." });
  }
});

router.post("/update-equipment", async (req, res) => {
  const { userId, equippedItems, gearInventory, craftingPoints } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const user = db.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    db.updateUserEquipment(userId, equippedItems || {}, gearInventory || [], craftingPoints || {});

    res.status(200).json({ message: "Equipment updated successfully!" });
  } catch (error) {
    console.error("Update equipment error:", error);
    res.status(500).json({ message: "Internal server error while updating equipment." });
  }
});

module.exports = router;
