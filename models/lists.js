

module.exports = function(sequelize, DataTypes) {
    const List = sequelize.define('List', {
        list_title: { //We need to decide if the table has a name or just id
            type: DataTypes.TEXT,
            //allowNull:false
        }
    });
    List.associate = function(models) {
        List.hasMany(models.Movie);
        List.belongsTo(models.User);
    };
    return List;
};




