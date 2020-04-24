
module.exports = function(sequelize, DataTypes) {
    const Movies = sequelize.define('Movies', {
        movie_name :{
            type: DataTypes.STRING,
            //allowNull:false,
        },
        imdb_id: {
            type: DataTypes.STRING,
            //allowNull:false
        },
    });
    Movies.associate = function(models) {
    Movies.belongsTo(models.Lists, {foreignKey: {name: 'id'}})
    };
    return Movies;
};

