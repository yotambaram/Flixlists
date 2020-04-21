const bcrypt = require("bcrypt");


module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique:true,
            allowNull:false
        },
        password :{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                len: [8]
            }
        }
        // add properites here
        // ex: name: DataTypes.STRING
    });

    User.beforeCreate(function(user){
        user.password = bcrypt.hashSync(user.password,bcrypt.genSaltSync(10),null);
    })

    return User;
};