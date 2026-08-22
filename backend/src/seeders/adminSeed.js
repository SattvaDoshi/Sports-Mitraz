require("dotenv").config({ path: __dirname + "/../../.env" });
const { sequelize, Admin } = require("../models");

const seedAdmin = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    const username = "admin";
    const password = "password123";

    const [admin, created] = await Admin.findOrCreate({
      where: { username },
      defaults: {
        password: password,
      },
    });

    if (created) {
      console.log(`✅ Admin created successfully (Username: ${username}, Password: ${password})`);
    } else {
      console.log("⚠️ Admin already exists. Updating password...");
      admin.password = password;
      await admin.save();
      console.log(`✅ Admin password updated (Username: ${username}, Password: ${password})`);
    }
  } catch (error) {
    console.error("❌ Failed to seed admin:", error);
  } finally {
    process.exit(0);
  }
};

seedAdmin();
