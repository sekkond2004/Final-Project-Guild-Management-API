require("dotenv").config();

const express = require("express");
const cors = require("cors");

const logger = require("./middleware/logger");

// Import Sequelize instance + models from index.js
const { sequelize } = require("./models");

// Routes
const authRoutes = require("./routes/authRoutes");
const guildRoutes = require("./routes/guildRoutes");
const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");
const requestRoutes = require("./routes/requestRoutes"); // JOIN REQUESTS

const app = express();
const PORT = process.env.PORT || 3000;

/* ======================
   MIDDLEWARE
====================== */

app.use(cors());
app.use(express.json());
app.use(logger);

/* ======================
   ROUTES
====================== */

app.use("/api/auth", authRoutes);
app.use("/api/guilds", guildRoutes);
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/requests", requestRoutes);

/* ======================
   ROOT ROUTE
====================== */

app.get("/", (req, res) => {
    res.json({
        message: "Guild Management API",
        version: "1.0",
        endpoints: {
            auth: "/api/auth",
            guilds: "/api/guilds",
            users: "/api/users",
            groups: "/api/groups",
            requests: "/api/requests"
        }
    });
});

/* ======================
   ERROR HANDLER
====================== */

app.use((err, req, res, next) => {

    console.error(err);

    res.status(err.status || 500).json({
        error: err.message || "Internal server error"
    });

});

/* ======================
   START SERVER
====================== */

async function startServer() {

    try {

        // Connect DB
        await sequelize.authenticate();
        console.log("Database connected");

        // Sync models
        await sequelize.sync();
        console.log("Database synced");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {

        console.error("Database failed:", error);

    }
}

startServer();