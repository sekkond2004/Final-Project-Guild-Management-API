const bcrypt = require("bcrypt");
const { sequelize, User, Guild, Group } = require("../models");

async function seedDatabase() {

    try {

        await sequelize.sync({ force: true });
        console.log("Database reset.");

        // ======================
        // 1. CREATE GUILDS
        // ======================
        const guild1 = await Guild.create({
            name: "Dragon Slayers"
        });

        const guild2 = await Guild.create({
            name: "Shadow Hunters"
        });

        // ======================
        // 2. HASH PASSWORD
        // ======================
        const hashedPassword = await bcrypt.hash("123456", 10);

        // ======================
        // 3. CREATE USERS
        // ======================
        await User.create({
            username: "Knight01",
            password: hashedPassword,
            role: "admin",
            contributionPoints: 15000,
            GuildId: guild1.id
        });

        await User.create({
            username: "MageMaster",
            password: hashedPassword,
            role: "guild_master",
            contributionPoints: 12000,
            GuildId: guild1.id
        });

        await User.create({
            username: "RookiePlayer",
            password: hashedPassword,
            role: "member",
            contributionPoints: 300,
            GuildId: guild1.id
        });

        await User.create({
            username: "ShadowStriker",
            password: hashedPassword,
            role: "member",
            contributionPoints: 800,
            GuildId: guild2.id
        });

        // ======================
        // 4. CREATE GROUPS
        // ======================
        await Group.create({
            groupNumber: 1,
            GuildId: guild1.id
        });

        await Group.create({
            groupNumber: 2,
            GuildId: guild1.id
        });

        console.log("Seeding complete!");

        process.exit();

    } catch (error) {
        console.error("Seed failed:", error);
    }
}

seedDatabase();