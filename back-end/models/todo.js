'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
      // define association here
    }
  }
  Todo.init({

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "title is required!" },
        notNull: { msg: "title is required!" }
      }
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "description is required!" },
        notNull: { msg: "description is required!" }
      }
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "status is required!" },
        notNull: { msg: "status is required!" }
      }
    },

    priority: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "priority is required!" },
        notNull: { msg: "priority is required!" }
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
    },

    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: "dueDate is required!" },
        notNull: { msg: "dueDate is required!" },
        isDate: { msg: "dueDate must be a valid date!" }
      }
    }
  }, 
  
  {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};