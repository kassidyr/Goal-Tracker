const sequelize = require('../config/connection');
const seedGoal = require('./goalData');
const seedPaintings = require('./paintingData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedGoal();

  await seedPaintings();

  process.exit(0);
};

seedAll();
