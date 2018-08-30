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
  passwordRequired:{
    type: Sequelize.BOOLEAN,
  }
};

const tpyeUser = db.define('typeUsers', fields
);


module.exports = {
  Model:tpyeUser,
  fields
};
/*
tpyeUser.sync({force: true}).then(() => {
  console.log('SE FUE A LA PUTA');
}); 
*/