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
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

const categoryDonations = db.define('categoryDonations', fields
);


module.exports = {
  Model:categoryDonations,
  fields
};

/*
categoryDonations.sync({force:true}).then(() => {
  console.log('SE FUE A LA PUTA');
}); 
*/