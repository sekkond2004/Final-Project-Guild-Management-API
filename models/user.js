module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {

        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        password: {
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
        },

        GuildId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }

    });

    return User;
};