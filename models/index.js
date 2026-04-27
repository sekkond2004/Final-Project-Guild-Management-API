const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// import model factories
const UserModel = require("./user");
const GuildModel = require("./guild");
const GroupModel = require("./group");
const JoinRequestModel = require("./joinRequest");

// initialize models
const User = UserModel(sequelize, DataTypes);
const Guild = GuildModel(sequelize, DataTypes);
const Group = GroupModel(sequelize, DataTypes);
const JoinRequest = JoinRequestModel(sequelize, DataTypes);

// =====================
// Associations
// =====================

// Guild → Users
Guild.hasMany(User);
User.belongsTo(Guild);

// Guild → Groups
Guild.hasMany(Group);
Group.belongsTo(Guild);

// Guild → JoinRequests
Guild.hasMany(JoinRequest);
JoinRequest.belongsTo(Guild);

// User → JoinRequests
User.hasMany(JoinRequest);
JoinRequest.belongsTo(User);

module.exports = {
    sequelize,
    User,
    Guild,
    Group,
    JoinRequest
};