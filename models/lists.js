
module.exports = function(sequelize, DataTypes) {
    const Lists = sequelize.define('Lists', {
        list_title: { //We need to decide if the table has a name or just id
            type: DataTypes.TEXT,
            allowNull:false
        },

    });
    Lists.associate = function(models) {
        Lists.belongsTo(models.User)
        Lists.hasMany(models.Movie)
    };
    return Lists;
};
