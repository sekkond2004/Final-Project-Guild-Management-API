module.exports = (sequelize, DataTypes) => {

    return sequelize.define("Group", {
        groupNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

};