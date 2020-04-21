module.exports = function(sequelize, DataTypes) {
    var Movie = sequelize.define('Movie', {
        movie_name: DataTypes.STRING,
        //PUT HERE THE PARAMETERS WE WANT
    });

    Product.associate = function(models) {
        Product.hasMany(models.Review);
    };
    return Movie;
};