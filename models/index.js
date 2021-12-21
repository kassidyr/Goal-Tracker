const User = require('./User');
// const Log = require('./Log');
const Goals = require('./Goals');

User.hasMany(Goals, {
    foreignKey: 'user_id'
});

Goals.belongsTo(User, {
    foreignKey: 'user_id'
});

// Goals.hasMany(Log, {
//   foreignKey: 'goal_id',
// });

// Log.belongsTo(Goals, {
//   foreignKey: 'goals_id',
// });

module.exports = { User, Goals };
