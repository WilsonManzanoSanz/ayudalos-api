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

const parentComment= db.define('parent-comments', fields
);


module.exports = {
  Model:parentComment,
  fields
};

/*
parentComment.sync({force: true}).then(() => {
  console.log('SE FUE A LA PUTA');
}); 
*/