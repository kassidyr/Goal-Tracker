const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Newgoal extends Model {}

Newgoal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    goaltitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    goaltext: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "newgoal",
  }
);

module.exports = Newgoal;
