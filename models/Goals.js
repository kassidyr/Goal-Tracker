const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Goals extends Model {}
    // static Log (body, models) {
    //     return models.Log.create({
    //       user_id: body.user_id,
    //       goal_id: body.goal_id
    //     }).then(() => {
    //         return Goals.findOne({
    //             where: {
    //             id: body.goal_id
    //             },
    //             attributes: [
    //             'id',
    //             'objective',
    //             'hoursEstimate',
    //             'created_at',
    //             [
    //                 sequelize.literal('(SELECT COUNT(*) FROM log WHERE goals.id = log.goals_id)'),
    //                 'log_total'
    //             ]
    //             ]
    //         });
    //     });
    // }


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
      type: DataTypes.INTEGER,
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
