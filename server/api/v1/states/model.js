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

const state = db.define('states', fields
);


module.exports = {
  Model:state,
  fields
};

/*
state.sync().then(() => {
  console.log('SE FUE A LA PUTA');
});
*/