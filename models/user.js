//user model declaration
'use strict';
const bcrypt = require('bcrypt');

// declare user model format
module.exports = function(sequelize, DataTypes) {
    // define user object 
    const user = sequelize.define('user', {
        image: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Invalid email address'
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 99],
                    msg: 'Name must be betweeb 1 and 99 characters'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [8, 99],
                    msg: 'Password is of incorrect length. Double check character number'
                }
            }
        }
    }, {
        hooks: {
            // before record creation 
            beforeCreate: function(createdUser, options) {
                if (createdUser && createdUser.password) {
                    let hash = bcrypt.hashSync(createdUser.password, 12);
                    createdUser.password = hash
                }
            }
        }
    });
    user.associate = function(models) {
        models.user.hasMany(models.manga)
        models.user.hasMany(models.anime)
        models.user.belongsToMany(models.anime, {through: 'users_anime'})
        //Todo: any user associate you want
    }
    //validPassword definition to validite password at usr login
    user.prototype.validPassword = function(passwordTyped) {
       return bcrypt.compareSync(passwordTyped, this.password)
    }

    // remove password before any serialization of user object
    user.prototype.toJSON = function() {
        let userData = this.get();
        delete userData.password;
        return userData
    }

    return user;
};
