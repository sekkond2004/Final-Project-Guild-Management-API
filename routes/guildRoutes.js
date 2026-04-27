const express = require("express");
const { Guild, JoinRequest, User } = require("../models");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");
const asyncHandler = require("../middleware/asyncHandler");

const router = express.Router();

/* GET ALL GUILDS */
router.get(
"/",
authenticateToken,
asyncHandler(async (req, res) => {
    const guilds = await Guild.findAll();
    res.json(guilds);
})
);

/* CREATE GUILD */
router.post(
"/",
authenticateToken,
authorizeRole("admin"),
asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Guild name required" });
    }

    const guild = await Guild.create({ name });

    res.status(201).json(guild);
})
);

/* DELETE GUILD */
router.delete(
"/:id",
authenticateToken,
authorizeRole("admin"),
asyncHandler(async (req, res) => {
    const guild = await Guild.findByPk(req.params.id);

    if (!guild) {
        return res.status(404).json({ error: "Guild not found" });
    }

    await guild.destroy();

    res.json({ message: "Guild deleted successfully" });
})
);

/* JOIN GUILD */
router.post(
"/:id/join",
authenticateToken,
authorizeRole("member", "guild_master", "admin"),
asyncHandler(async (req, res) => {
    const request = await JoinRequest.create({
        GuildId: req.params.id,
        UserId: req.user.id
    });

    res.status(201).json(request);
})
);

/* VIEW JOIN REQUESTS */
router.get(
"/:id/requests",
authenticateToken,
authorizeRole("admin", "guild_master"),
asyncHandler(async (req, res) => {
    const requests = await JoinRequest.findAll({
        where: { GuildId: req.params.id },
        include: [{ model: User }]
    });

    res.json(requests);
})
);

module.exports = router;