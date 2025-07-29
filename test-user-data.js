const DatabaseManager = require("./database/database");

// Create database instance
const db = new DatabaseManager();

function testUserData(userId) {
  console.log(`🔍 Testing user data for ID: ${userId}...\n`);

  try {
    // 1. User information
    console.log("👤 === USER INFORMATION ===");
    const user = db.findUserById(userId);
    if (user) {
      console.log(`Username: ${user.username}`);
      console.log(`Email: ${user.email}`);
      console.log(`Created: ${user.created_at}`);
    } else {
      console.log("❌ User not found");
      return;
    }

    // 2. Game progress
    console.log("\n🎮 === GAME PROGRESS ===");
    const progress = db.getGameProgress(userId);
    if (progress) {
      console.log(`Castle:`, progress.castle);
      console.log(`Resources:`, progress.resources);
      console.log(`Structures:`, progress.structures);
      console.log(`Last saved: ${progress.lastSaved}`);
    } else {
      console.log("No game progress found");
    }

    // 3. Game statistics
    console.log("\n📊 === GAME STATISTICS ===");
    const stats = db.getGameStats(userId);
    if (stats) {
      console.log(`Total play time: ${stats.total_play_time} seconds`);
      console.log(`Total resources mined: ${stats.total_resources_mined}`);
      console.log(`Structures built: ${stats.structures_built}`);
      console.log(`Last updated: ${stats.last_updated}`);
    } else {
      console.log("No game stats found");
    }

    // 4. Equipment
    console.log("\n⚔️ === EQUIPMENT ===");
    const equipment = db.getUserEquipment(userId);
    if (equipment) {
      console.log(`Equipped items:`, equipment.equippedItems);
      console.log(`Gear inventory:`, equipment.gearInventory);
      console.log(`Crafting points:`, equipment.craftingPoints);
      console.log(`Last updated: ${equipment.lastUpdated}`);
    } else {
      console.log("No equipment found");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    db.close();
    console.log("\n✅ Test completed");
  }
}

// Get user ID from command line arguments
const userId = process.argv[2];

if (!userId) {
  console.log("❌ Please provide user ID:");
  console.log("Example: node test-user-data.js 1");
  process.exit(1);
}

// Run test
testUserData(parseInt(userId));
