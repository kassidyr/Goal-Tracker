const { Goal } = require("../models");

const goaldata = [
  {
    name: "Goal Tracker1",
    starting_date: "April 20, 2021 07:00:00",
    ending_date: "June 21, 2021 17:00:00",
  },
];

const seedGoal = () => Goal.bulkCreate(goaldata);

module.exports = seedGoal;
