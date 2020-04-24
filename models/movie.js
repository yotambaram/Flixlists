
module.exports = function(sequelize, DataTypes) {
    const Movie = sequelize.define('Movie', {
        movie_name :{
            type: DataTypes.STRING,
            //allowNull:false,
        },
        imdb_id: {
            type: DataTypes.STRING,
            //allowNull:false
        }
    });
    Movie.associate = function(models) {
    Movie.belongsTo(models.List)
    };
    return Movie;
};

