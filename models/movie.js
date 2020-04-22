module.exports = function(sequelize, DataTypes) {
    var Movie = sequelize.define('Movie', {
        movie_name: DataTypes.STRING,
        //PUT HERE THE PARAMETERS WE WANT
    });

    Movie.associate = function(models) {
        // Movie.hasMany(models.Review);
        Movie.belongsTo(models.User)
    };
    return Movie;
};