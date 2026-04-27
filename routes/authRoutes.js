const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const router = express.Router();

/* ======================
REGISTER
====================== */
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                error: "Username and password required"
            });
        }

        const existingUser = await User.findOne({
            where: { username }
        });

        if (existingUser) {
            return res.status(409).json({
                error: "Username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashedPassword,
            role: "member"
        });

        res.status(201).json({
            message: "User registered",
            userId: user.id
        });

    } catch (err) {
        console.error("REGISTER ERROR:", err);
        res.status(500).json({ error: "Registration failed" });
    }
});

/* ======================
LOGIN
====================== */
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                error: "Username and password required"
            });
        }

        const user = await User.findOne({
            where: { username }
        });

        if (!user) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token
        });

    } catch (err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({ error: "Login failed" });
    }
});

/* ======================
LOGOUT (CLIENT HANDLED)
====================== */
router.post("/logout", (req, res) => {
    res.json({
        message: "Logout successful (delete token on client)"
    });
});

module.exports = router;