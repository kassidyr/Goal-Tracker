// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Log extends Model {}

// Log.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     hoursCompleted: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     goal_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'goals',
//         key: 'id',
//       },
//     },
//   },
//   {
//     sequelize,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'log',
//   }
// );

// module.exports = Log;
