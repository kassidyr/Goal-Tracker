const User = require('./User');
// const Log = require('./Log');
const Goals = require('./Goals');

// Goals.hasMany(Log, {
//   foreignKey: 'goal_id',
// });

// Log.belongsTo(Goals, {
//   foreignKey: 'goals_id',
// });

module.exports = { User, Goals };
