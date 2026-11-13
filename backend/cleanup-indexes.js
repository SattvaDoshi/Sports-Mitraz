require("dotenv").config();
const sequelize = require("./src/config/db");

async function cleanupTableIndexes(tableName, columnName = "slug") {
  console.log(`\n🔍 Checking indexes on table: ${tableName}...`);
  try {
    const [indexes] = await sequelize.query(`SHOW INDEXES FROM \`${tableName}\``);

    // Group indexes by Key_name
    const indexMap = {};
    for (const idx of indexes) {
      if (!indexMap[idx.Key_name]) {
        indexMap[idx.Key_name] = [];
      }
      indexMap[idx.Key_name].push(idx);
    }

    // Find all indexes on the given column (excluding PRIMARY)
    const candidateKeys = Object.keys(indexMap).filter((keyName) => {
      if (keyName === "PRIMARY") return false;
      const cols = indexMap[keyName].map((i) => i.Column_name);
      return cols.includes(columnName) || keyName.startsWith(`${columnName}_`);
    });

    console.log(`Found ${candidateKeys.length} index(es) for column "${columnName}" on ${tableName}.`);

    if (candidateKeys.length <= 1) {
      console.log(`✅ ${tableName} has only ${candidateKeys.length} index(es). No cleanup needed.`);
      return;
    }

    // Keep the preferred index 'slug' or the first one, drop all duplicates
    const keepIndex = candidateKeys.includes(columnName) ? columnName : candidateKeys[0];
    const toDrop = candidateKeys.filter((k) => k !== keepIndex);

    console.log(`Keeping index: "${keepIndex}". Dropping ${toDrop.length} duplicate index(es)...`);

    for (const key of toDrop) {
      try {
        await sequelize.query(`ALTER TABLE \`${tableName}\` DROP INDEX \`${key}\``);
        console.log(`  🗑️ Dropped index: ${key}`);
      } catch (err) {
        console.error(`  ❌ Failed to drop index ${key}:`, err.message);
      }
    }

    console.log(`✅ Finished cleaning indexes on ${tableName}.`);
  } catch (err) {
    console.error(`Error inspecting ${tableName}:`, err.message);
  }
}

async function run() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");

    await cleanupTableIndexes("Categories", "slug");
    await cleanupTableIndexes("Products", "slug");

    console.log("\n🎉 All duplicate indexes cleaned up successfully!");
    console.log("You can now start the server with: npm run dev\n");
    process.exit(0);
  } catch (error) {
    console.error("❌ Cleanup error:", error);
    process.exit(1);
  }
}

run();

