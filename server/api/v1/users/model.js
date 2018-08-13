const Sequelize = require('sequelize');
const { db } = require('../../../database');
const User = db.define('user', {
  displayName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  photoUrl: {
    type: Sequelize.STRING
  },
  uid: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
});
/*
User.sync({force: true}).then(() => {
  console.log('SE FUE A LA PUTA');
});
*/
module.exports = User;