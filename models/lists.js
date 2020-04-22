
module.exports = function(sequelize, DataTypes) {
    const Lists = sequelize.define('Lists', {
        list_title: { //We need to decide if the table has a name or just id
            type: DataTypes.INTEGER,
            allowNull:false
        }/*,
        user_id: {
            references: 'user',
            referencesKey: 'id'
        }*/
        //PUT HERE THE PARAMETERS WE WANT
    });
    Lists.associate = function(models) {
        Lists.belongsTo(models.User)
    };
    return Lists;
};
