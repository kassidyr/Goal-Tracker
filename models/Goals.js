const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Goals extends Model {}

Goals.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    objective: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hoursEstimate: {
      type: DataTypes.Integer,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'goals',
  }
);

module.exports = Goals;
