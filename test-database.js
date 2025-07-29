const DatabaseManager = require("./database/database");

// Create database instance
const db = new DatabaseManager();

async function testDatabase() {
  console.log("🔍 Starting database test...\n");

  try {
    // 1. Test database connection
    console.log("✅ Database connection successful\n");

    // 2. Get all users
    console.log("👥 === USER INFORMATION ===");
    try {
      const users = db.getAllUsers();
      if (users && users.length > 0) {
        users.forEach((user, index) => {
          console.log(`\n👤 User ${index + 1}:`);
          console.log(`   ID: ${user.id}`);
          console.log(`   Username: ${user.username}`);
          console.log(`   Email: ${user.email}`);
          console.log(`   Created: ${user.created_at}`);
        });
      } else {
        console.log("❌ No users found in database");
      }
    } catch (error) {
      console.log("❌ Error getting users:", error.message);
    }

    // 3. Get all game progress
    console.log("\n🎮 === GAME PROGRESS ===");
    try {
      const allProgress = db.getAllGameProgress();
      if (allProgress && allProgress.length > 0) {
        allProgress.forEach((progress, index) => {
          console.log(`\n🎯 Progress ${index + 1}:`);
          console.log(`   User ID: ${progress.user_id}`);
          console.log(`   Last Saved: ${progress.last_saved}`);

          try {
            const castleData = JSON.parse(progress.castle_data);
            console.log(`   Castle:`, castleData);
          } catch (e) {
            console.log(`   Castle: ${progress.castle_data}`);
          }

          try {
            const resources = JSON.parse(progress.resources);
            console.log(`   Resources:`, resources);
          } catch (e) {
            console.log(`   Resources: ${progress.resources}`);
          }

          try {
            const structures = JSON.parse(progress.structures);
            console.log(`   Structures:`, structures);
          } catch (e) {
            console.log(`   Structures: ${progress.structures}`);
          }
        });
      } else {
        console.log("❌ No game progress found");
      }
    } catch (error) {
      console.log("❌ Error getting game progress:", error.message);
    }

    // 4. Get all game stats
    console.log("\n📊 === GAME STATISTICS ===");
    try {
      const allStats = db.getAllGameStats();
      if (allStats && allStats.length > 0) {
        allStats.forEach((stats, index) => {
          console.log(`\n📈 Stats ${index + 1}:`);
          console.log(`   User ID: ${stats.user_id}`);
          console.log(`   Total Play Time: ${stats.total_play_time} seconds`);
          console.log(`   Total Resources Mined: ${stats.total_resources_mined}`);
          console.log(`   Structures Built: ${stats.structures_built}`);
          console.log(`   Last Updated: ${stats.last_updated}`);
        });
      } else {
        console.log("❌ No game stats found");
      }
    } catch (error) {
      console.log("❌ Error getting game stats:", error.message);
    }

    // 5. Get all user equipment
    console.log("\n⚔️ === USER EQUIPMENT ===");
    try {
      const allEquipment = db.getAllUserEquipment();
      if (allEquipment && allEquipment.length > 0) {
        allEquipment.forEach((equipment, index) => {
          console.log(`\n🛡️ Equipment ${index + 1}:`);
          console.log(`   User ID: ${equipment.user_id}`);
          console.log(`   Last Updated: ${equipment.last_updated}`);

          try {
            const equippedItems = JSON.parse(equipment.equipped_items);
            console.log(`   Equipped Items:`, equippedItems);
          } catch (e) {
            console.log(`   Equipped Items: ${equipment.equipped_items}`);
          }

          try {
            const gearInventory = JSON.parse(equipment.gear_inventory);
            console.log(`   Gear Inventory:`, gearInventory);
          } catch (e) {
            console.log(`   Gear Inventory: ${equipment.gear_inventory}`);
          }

          try {
            const craftingPoints = JSON.parse(equipment.crafting_points);
            console.log(`   Crafting Points:`, craftingPoints);
          } catch (e) {
            console.log(`   Crafting Points: ${equipment.crafting_points}`);
          }
        });
      } else {
        console.log("❌ No equipment found");
      }
    } catch (error) {
      console.log("❌ Error getting equipment:", error.message);
    }

    // 6. Summary statistics
    console.log("\n📋 === SUMMARY STATISTICS ===");
    try {
      const userCount = db.getUserCount();
      const progressCount = db.getProgressCount();
      const statsCount = db.getStatsCount();
      const equipmentCount = db.getEquipmentCount();

      console.log(`👥 Total Users: ${userCount}`);
      console.log(`🎮 Total Game Progress: ${progressCount}`);
      console.log(`📊 Total Game Stats: ${statsCount}`);
      console.log(`⚔️ Total Equipment: ${equipmentCount}`);
    } catch (error) {
      console.log("❌ Error getting summary statistics:", error.message);
    }
  } catch (error) {
    console.error("❌ General error in database test:", error);
  } finally {
    // Close database connection
    db.close();
    console.log("\n🔒 Database connection closed");
  }
}

// Run test
testDatabase();
