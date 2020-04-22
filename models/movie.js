module.exports = function(sequelize, DataTypes) {
    const Movie = sequelize.define('Movie', {
        movie_name :{
            type: DataTypes.STRING,
            allowNull:false,
        },
        imdb_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        }/*,
        list_id: {
            references: 'lists',
            referencesKey: 'id'
        }*/
    });
    Movie.associate = function(models) {
        Movie.belongsTo(models.User)
    };
    return Movie;
};




