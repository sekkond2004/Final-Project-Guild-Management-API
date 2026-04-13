const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { db, Guild, User, Group } = require('./database/setup');

const app = express();
const PORT = process.env.PORT || 3000;

/* ======================
   MIDDLEWARE
====================== */

app.use(cors());
app.use(express.json());

function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

app.use(logger);

/* ======================
   TEST DATABASE
====================== */

async function testConnection() {
    try {
        await db.authenticate();
        console.log("Database connection successful.");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

testConnection();

/* ======================
   HEALTH ENDPOINT
====================== */

app.get('/api/health', (req, res) => {
    res.json({
        status: "OK",
        message: "Guild API running",
        timestamp: new Date().toISOString()
    });
});

/* ======================
   ROOT ENDPOINT
====================== */

app.get('/', (req, res) => {
    res.json({
        message: "Guild Management API",
        version: "1.0",
        endpoints: {
            guilds: "/api/guilds",
            users: "/api/users",
            groups: "/api/groups"
        }
    });
});

/* ======================
   GUILD CRUD
====================== */

app.get('/api/guilds', async (req, res) => {
    try {

        const guilds = await Guild.findAll();

        res.json(guilds);

    } catch (error) {

        res.status(500).json({
            error: "Failed to fetch guilds"
        });

    }
});

app.get('/api/guilds/:id', async (req, res) => {

    const guild = await Guild.findByPk(req.params.id);

    if (!guild) {
        return res.status(404).json({ error: "Guild not found" });
    }

    res.json(guild);
});

app.post('/api/guilds', async (req, res) => {

    if (!req.body.name) {
        return res.status(400).json({ error: "Guild name required" });
    }

    const guild = await Guild.create(req.body);

    res.status(201).json(guild);
});

app.put('/api/guilds/:id', async (req, res) => {

    const guild = await Guild.findByPk(req.params.id);

    if (!guild) {
        return res.status(404).json({ error: "Guild not found" });
    }

    await guild.update(req.body);

    res.json(guild);
});

app.delete('/api/guilds/:id', async (req, res) => {

    const guild = await Guild.findByPk(req.params.id);

    if (!guild) {
        return res.status(404).json({ error: "Guild not found" });
    }

    await guild.destroy();

    res.json({ message: "Guild deleted" });
});

/* ======================
   USER CRUD
====================== */

app.get('/api/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

app.post('/api/users', async (req, res) => {

    if (!req.body.username) {
        return res.status(400).json({ error: "Username required" });
    }

    const user = await User.create(req.body);

    res.status(201).json(user);
});

app.put('/api/users/:id', async (req, res) => {

    const user = await User.findByPk(req.params.id);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    await user.update(req.body);

    res.json(user);
});

app.delete('/api/users/:id', async (req, res) => {

    const user = await User.findByPk(req.params.id);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    res.json({ message: "User deleted" });
});

/* ======================
   GROUP CRUD
====================== */

app.get('/api/groups', async (req, res) => {
    const groups = await Group.findAll();
    res.json(groups);
});

app.post('/api/groups', async (req, res) => {

    if (!req.body.groupNumber) {
        return res.status(400).json({ error: "Group number required" });
    }

    const group = await Group.create(req.body);

    res.status(201).json(group);
});

app.put('/api/groups/:id', async (req, res) => {

    const group = await Group.findByPk(req.params.id);

    if (!group) {
        return res.status(404).json({ error: "Group not found" });
    }

    await group.update(req.body);

    res.json(group);
});

app.delete('/api/groups/:id', async (req, res) => {

    const group = await Group.findByPk(req.params.id);

    if (!group) {
        return res.status(404).json({ error: "Group not found" });
    }

    await group.destroy();

    res.json({ message: "Group deleted" });
});

/* ======================
   ERROR HANDLING
====================== */

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({
        error: "Internal server error"
    });
});


/* ======================
   START SERVER
====================== */

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});