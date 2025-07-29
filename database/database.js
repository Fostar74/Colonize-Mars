const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const dbDir = path.join(__dirname);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, "colonize_mars.db");
const db = new Database(dbPath);

function initializeDatabase() {
  try {
    console.log("Initializing database...");

    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Users table created/verified");

    db.exec(`
      CREATE TABLE IF NOT EXISTS game_stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        total_play_time INTEGER DEFAULT 0,
        total_resources_mined INTEGER DEFAULT 0,
        structures_built INTEGER DEFAULT 0,
        last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Game stats table created/verified");

    db.exec(`
      CREATE TABLE IF NOT EXISTS game_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        castle_data TEXT NOT NULL,
        resources TEXT NOT NULL,
        structures TEXT NOT NULL,
        last_saved DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);
    console.log("Game progress table created/verified");

    db.exec(`
      CREATE TABLE IF NOT EXISTS user_equipment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        equipped_items TEXT NOT NULL,
        gear_inventory TEXT NOT NULL,
        crafting_points TEXT NOT NULL,
        last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);
    console.log("User equipment table created/verified");

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

class DatabaseManager {
  constructor() {
    initializeDatabase();
    this.initializeQueries();
  }

  initializeQueries() {
    this.userQueries = {
      createUser: db.prepare(`
        INSERT INTO users (email, username, password) 
        VALUES (?, ?, ?)
      `),

      findByEmail: db.prepare(`
        SELECT * FROM users WHERE email = ?
      `),

      findByUsername: db.prepare(`
        SELECT * FROM users WHERE username = ?
      `),

      findById: db.prepare(`
        SELECT * FROM users WHERE id = ?
      `),
    };

    this.progressQueries = {
      saveProgress: db.prepare(`
        INSERT OR REPLACE INTO game_progress 
        (user_id, castle_data, resources, structures) 
        VALUES (?, ?, ?, ?)
      `),

      getProgress: db.prepare(`
        SELECT * FROM game_progress WHERE user_id = ?
      `),

      updateProgress: db.prepare(`
        UPDATE game_progress 
        SET castle_data = ?, resources = ?, structures = ?, last_saved = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `),
    };

    this.statsQueries = {
      createStats: db.prepare(`
        INSERT INTO game_stats (user_id) VALUES (?)
      `),

      updateStats: db.prepare(`
        UPDATE game_stats 
        SET total_play_time = ?, total_resources_mined = ?, structures_built = ?, last_updated = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `),

      getStats: db.prepare(`
        SELECT * FROM game_stats WHERE user_id = ?
      `),
    };

    this.equipmentQueries = {
      saveEquipment: db.prepare(`
        INSERT OR REPLACE INTO user_equipment 
        (user_id, equipped_items, gear_inventory, crafting_points) 
        VALUES (?, ?, ?, ?)
      `),

      getEquipment: db.prepare(`
        SELECT * FROM user_equipment WHERE user_id = ?
      `),

      updateEquipment: db.prepare(`
        UPDATE user_equipment 
        SET equipped_items = ?, gear_inventory = ?, crafting_points = ?, last_updated = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `),
    };
  }

  createUser(email, username, hashedPassword) {
    try {
      const result = this.userQueries.createUser.run(email, username, hashedPassword);
      const userId = result.lastInsertRowid;

      this.statsQueries.createStats.run(userId);

      return { success: true, userId };
    } catch (error) {
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
        if (error.message.includes("email")) {
          throw new Error("Email is already registered");
        } else if (error.message.includes("username")) {
          throw new Error("Username is already taken");
        }
      }
      throw error;
    }
  }

  findUserByEmail(email) {
    return this.userQueries.findByEmail.get(email);
  }

  findUserByUsername(username) {
    return this.userQueries.findByUsername.get(username);
  }

  findUserById(id) {
    return this.userQueries.findById.get(id);
  }

  saveGameProgress(userId, castleData, resources, structures) {
    try {
      const castleJson = JSON.stringify(castleData);
      const resourcesJson = JSON.stringify(resources);
      const structuresJson = JSON.stringify(structures);

      this.progressQueries.saveProgress.run(userId, castleJson, resourcesJson, structuresJson);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  getGameProgress(userId) {
    try {
      const progress = this.progressQueries.getProgress.get(userId);
      if (!progress) return null;

      return {
        castle: JSON.parse(progress.castle_data),
        resources: JSON.parse(progress.resources),
        structures: JSON.parse(progress.structures),
        lastSaved: progress.last_saved,
      };
    } catch (error) {
      throw error;
    }
  }

  updateGameStats(userId, playTime, resourcesMined, structuresBuilt) {
    try {
      this.statsQueries.updateStats.run(playTime, resourcesMined, structuresBuilt, userId);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  getGameStats(userId) {
    try {
      return this.statsQueries.getStats.get(userId);
    } catch (error) {
      throw error;
    }
  }

  saveUserEquipment(userId, equippedItems, gearInventory, craftingPoints) {
    try {
      const equippedItemsJson = JSON.stringify(equippedItems);
      const gearInventoryJson = JSON.stringify(gearInventory);
      const craftingPointsJson = JSON.stringify(craftingPoints);

      this.equipmentQueries.saveEquipment.run(userId, equippedItemsJson, gearInventoryJson, craftingPointsJson);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  getUserEquipment(userId) {
    try {
      const equipment = this.equipmentQueries.getEquipment.get(userId);
      if (!equipment) return null;

      return {
        equippedItems: JSON.parse(equipment.equipped_items),
        gearInventory: JSON.parse(equipment.gear_inventory),
        craftingPoints: JSON.parse(equipment.crafting_points),
        lastUpdated: equipment.last_updated,
      };
    } catch (error) {
      throw error;
    }
  }

  updateUserEquipment(userId, equippedItems, gearInventory, craftingPoints) {
    try {
      const equippedItemsJson = JSON.stringify(equippedItems);
      const gearInventoryJson = JSON.stringify(gearInventory);
      const craftingPointsJson = JSON.stringify(craftingPoints);

      this.equipmentQueries.updateEquipment.run(equippedItemsJson, gearInventoryJson, craftingPointsJson, userId);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }


  getAllUsers() {
    try {
      return db.prepare("SELECT * FROM users ORDER BY id").all();
    } catch (error) {
      throw error;
    }
  }

  getAllGameProgress() {
    try {
      return db.prepare("SELECT * FROM game_progress ORDER BY user_id").all();
    } catch (error) {
      throw error;
    }
  }

  getAllGameStats() {
    try {
      return db.prepare("SELECT * FROM game_stats ORDER BY user_id").all();
    } catch (error) {
      throw error;
    }
  }

  getAllUserEquipment() {
    try {
      return db.prepare("SELECT * FROM user_equipment ORDER BY user_id").all();
    } catch (error) {
      throw error;
    }
  }

  getUserCount() {
    try {
      const result = db.prepare("SELECT COUNT(*) as count FROM users").get();
      return result.count;
    } catch (error) {
      throw error;
    }
  }

  getProgressCount() {
    try {
      const result = db.prepare("SELECT COUNT(*) as count FROM game_progress").get();
      return result.count;
    } catch (error) {
      throw error;
    }
  }

  getStatsCount() {
    try {
      const result = db.prepare("SELECT COUNT(*) as count FROM game_stats").get();
      return result.count;
    } catch (error) {
      throw error;
    }
  }

  getEquipmentCount() {
    try {
      const result = db.prepare("SELECT COUNT(*) as count FROM user_equipment").get();
      return result.count;
    } catch (error) {
      throw error;
    }
  }

  close() {
    db.close();
  }
}

module.exports = DatabaseManager;
