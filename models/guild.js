module.exports = (sequelize, DataTypes) => {

    return sequelize.define("Guild", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

};