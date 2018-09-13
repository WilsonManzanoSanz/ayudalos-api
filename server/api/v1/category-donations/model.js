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
   moneyRequired: {
    type: Sequelize.INTEGER,
  },
};

const categoryDonations = db.define('categoryDonations', fields
);


module.exports = {
  Model:categoryDonations,
  fields
};
/*
db.query("ALTER TABLE categoryDonations ADD moneyRequired INT AFTER category").then(success => console.log(success)).catch(error => console.error(er));

categoryDonations.sync().then(() => {
  console.log('SE FUE A LA PUTA');
}); 
*/