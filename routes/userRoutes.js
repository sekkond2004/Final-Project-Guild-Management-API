const express = require("express");
const { User } = require("../models");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");
const asyncHandler = require("../middleware/asyncHandler");

const router = express.Router();

/* ======================
GET ALL USERS (ADMIN ONLY)
====================== */
router.get(
"/",
authenticateToken,
authorizeRole("admin"),
asyncHandler(async (req, res) => {

    const users = await User.findAll();

    const safeUsers = users.map(user => {
        const { password, ...safe } = user.toJSON();
        return safe;
    });

    res.json(safeUsers);
})
);

/* ======================
GET USER BY ID
====================== */
router.get(
"/:id",
authenticateToken,
asyncHandler(async (req, res) => {

    const user = await User.findByPk(req.params.id);

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    const { password, ...safeUser } = user.toJSON();

    res.json(safeUser);
})
);

/* ======================
UPDATE USER
(Admin or self only)
====================== */
router.put(
"/:id",
authenticateToken,
asyncHandler(async (req, res) => {

    const user = await User.findByPk(req.params.id);

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    // only admin or self
    if (req.user.role !== "admin" && req.user.id !== parseInt(req.params.id)) {
        return res.status(403).json({
            error: "Not allowed to update this user"
        });
    }

    const { contributionPoints, role } = req.body;

    if (contributionPoints !== undefined) {
        user.contributionPoints = contributionPoints;
    }

    // only admin can change role
    if (role !== undefined) {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                error: "Only admin can change roles"
            });
        }
        user.role = role;
    }

    await user.save();

    const { password, ...safeUser } = user.toJSON();

    res.json(safeUser);
})
);

/* ======================
DELETE USER (ADMIN ONLY)
====================== */
router.delete(
"/:id",
authenticateToken,
authorizeRole("admin"),
asyncHandler(async (req, res) => {

    const user = await User.findByPk(req.params.id);

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    await user.destroy();

    res.json({
        message: "User deleted successfully"
    });
})
);

module.exports = router;