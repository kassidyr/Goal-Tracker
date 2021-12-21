const { Painting } = require("../models");

const paintingdata = [
  {
    title: "Goal Tracker1",
    artist: "John Doe",
    exhibition_date: "March 30, 2018",
    goal_id: 1,
    filename: "goal-tracker.jpeg",
    description: "This is to track my goal.",
  },
];

const seedPaintings = () => Painting.bulkCreate(paintingdata);

module.exports = seedPaintings;
