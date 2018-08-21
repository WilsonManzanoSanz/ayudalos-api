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
  description:{
    type: Sequelize.STRING,
    allowNull: false,
  }
};

const CommentPosts = db.define('comment-posts', fields
);


module.exports = {
  Model:CommentPosts,
  fields
};

/*
CommentPosts.sync({force:true}).then(() => {
  console.log('SE FUE A LA PUTA');
});
*/
