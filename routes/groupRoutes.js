const express = require("express");
const { Group, Guild } = require("../models");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");
const asyncHandler = require("../middleware/asyncHandler");

const router = express.Router();

/* GET ALL GROUPS */
router.get(
"/",
authenticateToken,
asyncHandler(async (req, res) => {
    const groups = await Group.findAll();
    res.json(groups);
})
);

/* CREATE GROUP */
router.post(
"/",
authenticateToken,
authorizeRole("admin", "guild_master"),
asyncHandler(async (req, res) => {
    const { groupNumber, GuildId } = req.body;

    if (!groupNumber || !GuildId) {
        return res.status(400).json({ error: "groupNumber and GuildId required" });
    }

    const guild = await Guild.findByPk(GuildId);

    if (!guild) {
        return res.status(404).json({ error: "Guild not found" });
    }

    const group = await Group.create({ groupNumber, GuildId });

    res.status(201).json(group);
})
);

/* UPDATE GROUP */
router.put(
"/:id",
authenticateToken,
authorizeRole("admin", "guild_master"),
asyncHandler(async (req, res) => {
    const group = await Group.findByPk(req.params.id);

    if (!group) {
        return res.status(404).json({ error: "Group not found" });
    }

    if (req.body.groupNumber !== undefined) {
        group.groupNumber = req.body.groupNumber;
    }

    await group.save();

    res.json(group);
})
);

/* DELETE GROUP */
router.delete(
"/:id",
authenticateToken,
authorizeRole("admin"),
asyncHandler(async (req, res) => {
    const group = await Group.findByPk(req.params.id);

    if (!group) {
        return res.status(404).json({ error: "Group not found" });
    }

    await group.destroy();

    res.json({ message: "Group deleted" });
})
);

module.exports = router;