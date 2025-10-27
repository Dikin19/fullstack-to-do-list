'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
      // define association here
    }
  }
  Profile.init({
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "fullname is required!" },
        notNull: { msg: "fullname is required!" }
      }
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "bio is required!" },
        notNull: { msg: "bio is required!" }
      }
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "avatarUrl is required!" },
        notNull: { msg: "avatarUrl is required!" },
        isUrl: { msg: "avatarUrl must be a valid URL!" }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "phone is required!" },
        notNull: { msg: "phone is required!" },
        isNumeric: { msg: "phone must contain only numbers!" }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      },
      allowNull: false,
      validate: {
        notEmpty: { msg: "userId is required!" },
        notNull: { msg: "userId is required!" }
      }
    }
  },  {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};