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
    type: Sequelize.INTEGER,
  },
  description:{
    type: Sequelize.STRING,
    allowNull: false,
  }
};

const commentPetitions = db.define('commentPetitions', fields
);

module.exports = {
  Model:commentPetitions,
  fields
};
/*
commentPetitions.sync({force:true}).then(() => {
  console.log('SE FUE A LA PUTA');
});
*/
