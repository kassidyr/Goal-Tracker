// import the Model class and DataTypes object from Sequelize
// the model class is what we create our own models from using the extends keyword so User inherits all the functionality the Model class has
const { Model, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

//create our User model
class User extends Model {}

// class User extends Model {
//   checkPassword(loginPw) {
//     return bcrypt.compareSync(loginPw, this.password);
//   }
// }

// define table columns and configuration
// column settings can be found in Sequelize model definition documents: https://sequelize.org/v5/manual/models-definition.html
// DataType options can be found in the Sequelize DataTypes documents: https://sequelize.org/v5/manual/data-types.html
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the password must be at least six characters long  
        len: [6],
      },
    },
  },
  {
//     hooks: {
//       async beforeCreate(newUserData) {
//         newUserData.password = await bcrypt.hash(newUserData.password, 10);
//         return newUserData;
//       },
//     },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
