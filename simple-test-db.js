const DatabaseManager = require("./database/database");

// Create database instance
const db = new DatabaseManager();

function simpleTestDatabase() {
  console.log("🔍 Simple database test...\n");

  try {
    // 1. User information
    console.log("👥 === USERS ===");
    const users = db.getAllUsers();
    if (users && users.length > 0) {
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.username} (${user.email}) - ID: ${user.id}`);
      });
    } else {
      console.log("No users found");
    }

    // 2. Game progress
    console.log("\n🎮 === GAME PROGRESS ===");
    const progress = db.getAllGameProgress();
    if (progress && progress.length > 0) {
      progress.forEach((p, index) => {
        console.log(`${index + 1}. User ID: ${p.user_id} - Last saved: ${p.last_saved}`);
      });
    } else {
      console.log("No game progress found");
    }

    // 3. Game statistics
    console.log("\n📊 === GAME STATISTICS ===");
    const stats = db.getAllGameStats();
    if (stats && stats.length > 0) {
      stats.forEach((s, index) => {
        console.log(
          `${index + 1}. User ID: ${s.user_id} - Play time: ${s.total_play_time}s - Resources: ${
            s.total_resources_mined
          }`
        );
      });
    } else {
      console.log("No game stats found");
    }

    // 4. Equipment
    console.log("\n⚔️ === EQUIPMENT ===");
    const equipment = db.getAllUserEquipment();
    if (equipment && equipment.length > 0) {
      equipment.forEach((e, index) => {
        console.log(`${index + 1}. User ID: ${e.user_id} - Last updated: ${e.last_updated}`);
      });
    } else {
      console.log("No equipment found");
    }

    // 5. Summary
    console.log("\n📋 === SUMMARY ===");
    console.log(`Users: ${db.getUserCount()}`);
    console.log(`Game Progress: ${db.getProgressCount()}`);
    console.log(`Game Stats: ${db.getStatsCount()}`);
    console.log(`Equipment: ${db.getEquipmentCount()}`);
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    db.close();
    console.log("\n✅ Test completed");
  }
}

// Run test
simpleTestDatabase();
