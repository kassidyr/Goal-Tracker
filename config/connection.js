// import the Sequlize constructor from the library
const Sequelize = require('sequelize');

// execute so that the data in the .env file will be made available at process.env<ENVIRONMENT-VARIABLE-NAME>
require('dotenv').config();

// create connection to our database, pass in your MySQL information for username and password from the .env file
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;
