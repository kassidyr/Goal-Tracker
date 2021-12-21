const User = require('./User');
const Goals = require('./Goals');
const Log = require('./Log');

User.hasMany(Goals, {
    foreignKey: 'user_id'
});

Goals.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(Goals, {
    through: Log,
    as: 'logged_hours',
    foreignKey: 'user_id'
});

// User.belongsToMany(Log, {
//     through: Goals,
//     as: 'objective',
//     foreignKey: 'user_id'
// });

Goals.belongsToMany(User, {
    through: Log,
    as: "logged_hours",
    foreignKey: 'goals_id'
});

Log.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Log.belongsTo(Goals, {
    foreignKey: 'goals_id'
});
  
User.hasMany(Log, {
    foreignKey: 'user_id'
});
  
Goals.hasMany(Log, {
    foreignKey: 'goals_id'
});

module.exports = { User, Goals, Log };
