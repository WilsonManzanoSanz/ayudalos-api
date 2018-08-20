const Sequelize = require('sequelize');
const { db } = require('../../../database');
//TODO create a validator for email field
const fields = {
 id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true,
  },
  userUid: {
    type: Sequelize.INTEGER,
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
    type: Sequelize.STRING
  },
};

const Post = db.define('posts', fields
);

Post.searchByTittle = (query)=> new Promise((resolve, reject)=>{
  const Op = Sequelize.Op;
  let whereQuery = {where:{}};
  whereQuery.where[query.key] = {[Op.like]: `%${query.value}%`};
  User.findAll(whereQuery).then(users => {
    resolve(users);
  }).catch((err) => {
      reject(err);
  });
});

Post.paginateFind = (skip, limit, sort, page) => new Promise((resolve, reject)=>{
  
  const query = { offset: skip, limit: limit, ...sort, };
  const count = Post.count();
  const all = Post.findAll(query);
  
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
  Model:Post,
  fields
};
/*
Post.sync().then(() => {
  console.log('SE FUE A LA PUTA');
}); 
*/