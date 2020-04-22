//const bcrypt = require("bcrypt");


module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        first_name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        last_name :{
            type: DataTypes.STRING,
            allowNull:false,
        },
        email :{
            type: DataTypes.STRING,
            allowNull:false,
            isEmail: true,
        },
        password :{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                len: [8]
            }
        }
    });

    User.associate = function(models) {
        User.hasMany(models.Movie);
    }

    User.beforeCreate(function(user){
        user.password = bcrypt.hashSync(user.password,bcrypt.genSaltSync(10),null);
    })

    return User;
};