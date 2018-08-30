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

const typeDestination = db.define('typeDestinations', fields
);


module.exports = {
  Model:typeDestination,
  fields
};
/*
typeDestination.sync({force: true}).then(() => {
  console.log('SE FUE A LA PUTA');
}); 
*/