// import the Model class and DataTypes object from Sequelize
// the model class is what we create our own models from using the extends keyword so User inherits all the functionality the Model class has
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

//create our User model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
  }


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
    hooks: {
        // set up beforeCreate lifecycle "hook" functionality
        // the saltRounds parameter of 10 sets up 10 rounds of hashing
        // the hased password is then passed to the newUserData object
        // the return exits the function, returning the hashed password in the newUserData function
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        // set up beforeUpdate lifecycle "hook" functionality
        // Sequelize documentation regarding the beforeUpdate: https://sequelize.org/v5/manual/hooks.html
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
  }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
