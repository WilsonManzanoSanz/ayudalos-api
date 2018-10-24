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

//db.query("ALTER TABLE posts drop categoryDonationId").then(success => console.log(success)).catch(error => console.error(error));
//db.query("alter table posts drop foreign key posts_ibfk_2").then(success => console.log(success)).catch(error => console.error(error));


Post.sync().then(() => {
  //console.log('SE FUE A LA PUTA');
});
