'use strict';

const {
  Model
} = require('sequelize');

const {hashPassword} = require('../helpers/bcrypt');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, {foreignKey: 'userId', as: 'profile'})
      User.hasMany(models.Todo, {foreignKey: 'userId', as: 'todos'})
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : "Username is required!"
        }
      }
    },

    email: {
      type:  DataTypes.STRING,
      allowNull: false,

      unique: {
        msg: "Email must be unique"
        },

      validate: {
        notEmpty: {
          msg : "Email is required!"
        },

        notNull:{
          msg: "Email is required"
        },

        isEmail:{
          msg: "Email must be email format"
        }

      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: {
          msg : "Password is required!"
        },
        len: {
          args: [0, Infinity],
          msg : `password more than 4 characters `
        }
      }
    },

  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },

  status:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'customer',
    validate: {
      isIn: {
        args: [['customer', 'admin']],
        msg: 'Status must be customer or admin'
      }
    }
  },


  }, {
    sequelize,
    modelName: 'User',

    indexes: [
            {
              unique: true,
              fields: ['email']
            }
          ]
    });

  User.beforeCreate((user) => {
    user.password = hashPassword(user.password)
  })

  return User;
};