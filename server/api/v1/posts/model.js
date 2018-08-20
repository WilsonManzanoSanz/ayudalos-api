const Sequelize = require('sequelize');
const { db } = require('../../../database');
//TODO create a validator for email field
const fields = {
 id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true,
  },
  tittle: {
    type: Sequelize.STRING,
     allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
     allowNull: false,
  },
  photoURL: {
    type: Sequelize.STRING,
  },
   destine: {
    type: Sequelize.STRING,
  }, 
  expirationTime: {
    type: Sequelize.DATE,
  },
   deliverTime: {
    type: Sequelize.DATE,
  }  
};

const Post = db.define('posts', fields
);

module.exports = {
  Model:Post,
  fields
};
/*
Post.sync().then(() => {
  console.log('SE FUE A LA PUTA');
}); 
*/