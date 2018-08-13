const Sequelize = require('sequelize');
const { db } = require('../../../database');
//TODO create a validator for email field
const User = db.define('user', {
  displayName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  photoUrl: {
    type: Sequelize.STRING
  },
  uid: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
});

User.paginateFind = (skip, limit, page) => new Promise((resolve, reject)=>{
  
  const count = User.count();
  const all = User.findAll({ offset: skip, limit: limit });
  
   Promise.all([count, all])
    .then((response) => {
      const [total = 0, data = [] ] = response;
      const pages = Math.ceil(total / limit);
      resolve({
        data: data,
        meta: {
          limit,
          skip,
          total,
          page,
          pages,
        },
      });
    })
    .catch((err) => {
      reject(err);
    });
});
/*
User.sync({force: true}).then(() => {
  console.log('SE FUE A LA PUTA');
});
*/
module.exports = User;