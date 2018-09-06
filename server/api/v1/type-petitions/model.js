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

const typePetitions = db.define('typePetitions', fields
);


module.exports = {
  Model:typePetitions,
  fields
};
/*
typePetitions.sync({force: true}).then(() => {
  console.log('SE FUE A LA PUTA');
}); 
 */