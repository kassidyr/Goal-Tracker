const User = require("./User");
const Newgoal = require("./Newgoal");
const Goal = require("./Goal");
const Painting = require("./Painting");

Goal.hasMany(Painting, {
  foreignKey: "goal_id",
});

Painting.belongsTo(Goal, {
  foreignKey: "goal_id",
});

module.exports = { User, Newgoal, Goal, Painting };
