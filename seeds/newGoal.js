const { Newgoal } = require("../models");

const newgoaldata = [
  {
    id: 1,
    goaltitle: "Travel 3 times this year",
    goaltext: "This is to track my goal.",
  },
];

const seedNewgoals = () => Newgoal.bulkCreate(newgoaldata);

module.exports = seedNewgoals;
