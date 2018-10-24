const Sequelize = require('sequelize');
const { db } = require('../../../database');
//TODO create a validator for email field
const fields = {
  displayName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  photoURL: {
    type: Sequelize.STRING
  },
  uid: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
};

const User = db.define('users', fields
);

module.exports = {
  Model:User,
  fields
};

//db.query("ALTER TABLE users ADD typeUserId INT AFTER uid").then(success => console.log(success)).catch(error => console.error(error));

User.sync().then(() => {
  //console.log('SE FUE A LA PUTA');
});

