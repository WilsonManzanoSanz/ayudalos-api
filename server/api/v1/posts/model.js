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
  photoURL: {
    type: Sequelize.STRING
  },
  uid: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  profile: {
    type: Sequelize.STRING,
    allowNull: true,
  },
};

const User = db.define('user', fields
);

User.searchByTittle = (query)=> new Promise((resolve, reject)=>{
  const Op = Sequelize.Op;
  let whereQuery = {where:{}};
  whereQuery.where[query.key] = {[Op.like]: `%${query.value}%`};
  User.findAll(whereQuery).then(users => {
    resolve(users);
  }).catch((err) => {
      reject(err);
  });
});

User.paginateFind = (skip, limit, sort, page) => new Promise((resolve, reject)=>{
  
  const query = { offset: skip, limit: limit, ...sort, };
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

module.exports = {
  Model:User,
  fields
};

/*
User.sync({force: true}).then(() => {
  console.log('SE FUE A LA PUTA');
}); 
*/