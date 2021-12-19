const { Log } = require('../models');

const logdata = [
  {
    hoursCompleted: '20',
    goal_id:'1',
  },
  {
    hoursCompleted: '5',
    goal_id:'2',
  },
  {
    hoursCompleted: '15',
    goal_id:'3',
  },
];

const seedLog = () => Log.bulkCreate(logdata);

module.exports = seedLog;
