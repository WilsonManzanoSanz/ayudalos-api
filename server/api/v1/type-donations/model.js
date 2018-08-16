const Sequelize = require('sequelize');
const { db } = require('../../../database');
//TODO create a validator for email field
const fields = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true,
    unique: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

const typeDonations = db.define('type-donations', fields
);


module.exports = {
  Model:typeDonations,
  fields
};

/*
typeDonations.sync({force: true}).then(() => {
  console.log('SE FUE A LA PUTA');
}); 
*/