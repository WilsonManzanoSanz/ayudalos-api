const Sequelize = require('sequelize');
const dbUser = require('./../users/model'); 
const dbPost = require('./../posts/model'); 
const dbCaterogy = require('./../category-donations/model'); 
const dbComment = require('./../posts-comments/model'); 
const dbTypeDestination = require('./../type-destinations/model'); 
const dbType = require('./../type-donations/model'); 
const dbTypeUser = require('./../type-users/model'); 
const dbState = require('./../states/model'); 

dbPost.Model.belongsTo(dbUser.Model);  
dbComment.Model.belongsTo(dbPost.Model);
dbComment.Model.belongsTo(dbUser.Model);  
dbUser.Model.hasMany(dbPost.Model);
dbPost.Model.hasMany(dbComment.Model);

dbUser.Model.belongsTo(dbTypeUser.Model);
dbPost.Model.belongsTo(dbCaterogy.Model);  
dbPost.Model.belongsTo(dbTypeDestination.Model);  
dbPost.Model.belongsTo(dbType.Model); 
dbPost.Model.belongsTo(dbState.Model);  

dbComment.Model.sync().
  then(() => { }).
  catch((error)=>console.error(error));
dbPost.Model.sync()
  .then(() => {})
  .catch((error)=>console.error(error));
dbUser.Model.sync().then(
  () => { }).
  catch((error)=>console.error(error));

const includePost = [
        { model: dbUser.Model },
        { model: dbCaterogy.Model },
        { model: dbTypeDestination.Model },
        { model: dbType.Model },
        { model: dbState.Model },
        { model: dbComment.Model, include: {model:dbUser.Model} },
      ];
 const includeUser = [{model: dbPost.Model, include: {model:dbComment.Model, include:{model:dbUser.Model}}, limit:10}, 
                      {model:dbTypeUser.Model}];

dbUser.Model.searchByTittle = (query)=> new Promise((resolve, reject)=>{
  const Op = Sequelize.Op;
  let whereQuery = {where:{}, include:includeUser};
  whereQuery.where[query.key] = {[Op.like]: `%${query.value}%`};
  dbUser.Model.findAll(whereQuery).then(users => {
    resolve(users);
  }).catch((err) => {
      reject(err);
  });
});

dbUser.Model.paginateFind = (skip, limit, sort, page) => new Promise((resolve, reject)=>{
  const query = Object.assign({include:includeUser, offset:skip,limit:limit}, sort);
  //const query = {include:includeUser, offset:skip,limit:limit,...sort};
  const count = dbUser.Model.count();
  const all = dbUser.Model.findAll(query);
  
   Promise.all([count, all])
    .then((response) => {
      const [total = 0, data = [] ] = response;
      const pages = Math.ceil(total / limit);
      resolve({
        items: data,
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

dbPost.Model.searchByTittle = (query)=> new Promise((resolve, reject)=>{
  const Op = Sequelize.Op;
  let whereQuery = {where:{},include: includePost};
  whereQuery.where[query.key] = {[Op.like]: `%${query.value}%`};
  dbPost.Model.findAll(whereQuery).then(users => {
    resolve(users);
  }).catch((err) => {
      reject(err);
  });
});

dbPost.Model.paginateFind = (skip, limit, sort, page) => new Promise((resolve, reject)=>{
  
  /*const query = {
      include: includePost,
      offset:skip,
      limit:limit,
      ...sort,
  };*/
  const query = Object.assign({include:includePost, offset:skip,limit:limit}, sort);
  const count = dbPost.Model.count();
  const all = dbPost.Model.findAll(query);
  
   Promise.all([count, all])
    .then((response) => {
      const [total = 0, data = [] ] = response;
      const pages = Math.ceil(total / limit);
      resolve({
        items: data,
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
  User: dbUser.Model,
  Post:dbPost.Model,
  TypeDonation:dbType.Model,
  TypeUser:dbTypeUser.Model,
  TypeDestination:dbTypeDestination.Model,
  State: dbState.Model,
  Caterogy: dbCaterogy.Model,
  Comments: dbComment.Model
};
