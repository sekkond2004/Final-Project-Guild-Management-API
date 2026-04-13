const { db, Guild, User, Group } = require('./setup');

async function seedDatabase() {

    try {
        console.log("Creating guild...");

        await db.sync();
        const guild = await Guild.create({
            name: "Dragon Slayers"
        });

        await User.bulkCreate([
            {
                username: "Knight01",
                role: "guild_master",
                contributionPoints: 15000,
                GuildId: guild.id
            },
            {
                username: "ShadowMage",
                role: "elite_member",
                contributionPoints: 12000,
                GuildId: guild.id
            },
            {
                username: "NewPlayer",
                role: "member",
                contributionPoints: 200,
                GuildId: guild.id
            }
        ]);

        console.log("Guild created:", guild.name);
        
        await Group.create({
            groupNumber: 1,
            GuildId: guild.id
        });

        console.log("Database seeded successfully.");
        process.exit();

    } catch (error) {
        console.error("Seed failed:", error);
    }
}

seedDatabase();