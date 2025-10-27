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
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,

    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key : "id"
      },
      allowNull: false,
      validate: {
          notEmpty: {
          msg : "userId is required!"
          }
        }
      },

    dueDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};