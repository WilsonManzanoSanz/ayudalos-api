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
  expirationTime: {
    type: Sequelize.DATE,
  },
   goal: {
    type: Sequelize.INTEGER,
  }  
};

const Petition = db.define('petitions', fields
);

module.exports = {
  Model:Petition,
  fields
};
/*
Petition.sync({force:true}).then(() => {
  console.log('SE FUE A LA PUTA');
}); */