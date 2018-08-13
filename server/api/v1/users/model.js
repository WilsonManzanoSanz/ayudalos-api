const Sequelize = require('sequelize');
const { db } = require('../../../database');
//TODO create a validator for email field
const fields = {
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
};

const User = db.define('user', fields
);

User.paginateFind = (skip, limit, sort, page) => new Promise((resolve, reject)=>{
  
  const query = { offset: skip, limit: limit, ...sort, };
  console.log(query);
  const count = User.count();
  const all = User.findAll(query);
  
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
module.exports = {
  Model:User,
  fields
};