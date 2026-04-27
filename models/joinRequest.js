module.exports = (sequelize, DataTypes) => {

    return sequelize.define("JoinRequest", {

        status: {
            type: DataTypes.STRING,
            defaultValue: "pending"
        },

        GuildId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    });

};