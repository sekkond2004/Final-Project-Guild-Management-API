const express = require("express");
const { JoinRequest, User } = require("../models");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");
const asyncHandler = require("../middleware/asyncHandler");

const router = express.Router();

/* GET ALL JOIN REQUESTS */
router.get(
"/",
authenticateToken,
authorizeRole("admin", "guild_master"),
asyncHandler(async (req, res) => {
    const requests = await JoinRequest.findAll({
        include: [{ model: User }]
    });

    res.json(requests);
})
);

/* APPROVE REQUEST */
router.post(
"/:id/approve",
authenticateToken,
authorizeRole("admin", "guild_master"),
asyncHandler(async (req, res) => {
    const request = await JoinRequest.findByPk(req.params.id);

    if (!request) {
        return res.status(404).json({ error: "Request not found" });
    }

    request.status = "approved";
    await request.save();

    const user = await User.findByPk(request.UserId);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    user.GuildId = request.GuildId;
    await user.save();

    res.json({ message: "User added to guild" });
})
);

module.exports = router;