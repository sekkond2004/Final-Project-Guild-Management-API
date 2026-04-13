const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.sqlite'
});

/* MODELS */

const Guild = db.define('Guild', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const User = db.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "member"
    },
    contributionPoints: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

const Group = db.define('Group', {
    groupNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

/* RELATIONSHIPS */

Guild.hasMany(User);
User.belongsTo(Guild);

Guild.hasMany(Group);
Group.belongsTo(Guild);

/* SETUP FUNCTION */

async function setupDatabase() {
    try {
        await db.sync(); 
        console.log("Database tables created.");
    } catch (error) {
        console.error("Database setup failed:", error);
    }
}

module.exports = {
    db,
    Guild,
    User,
    Group,
    setupDatabase
};