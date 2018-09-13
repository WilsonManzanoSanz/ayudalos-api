const Sequelize = require('sequelize');
const dbUser = require('./../users/model'); 
const dbPetition = require('./../petitions/model'); 
const dbCaterogy = require('./../category-donations/model'); 
const dbComment = require('./../petitions-comments/model'); 
const dbTypeDestination = require('./../type-destinations/model'); 
const dbType = require('./../type-petitions/model'); 
const dbTypeUser = require('./../type-users/model'); 
const dbState = require('./../states/model'); 

dbPetition.Model.belongsTo(dbUser.Model);  
dbComment.Model.belongsTo(dbPetition.Model);
dbComment.Model.belongsTo(dbUser.Model);  
dbUser.Model.hasMany(dbPetition.Model);
dbPetition.Model.hasMany(dbComment.Model);

dbUser.Model.belongsTo(dbTypeUser.Model);
dbPetition.Model.belongsTo(dbCaterogy.Model);  
dbPetition.Model.belongsTo(dbTypeDestination.Model);  
dbPetition.Model.belongsTo(dbType.Model); 
dbPetition.Model.belongsTo(dbState.Model);  
/*
dbComment.Model.sync().
  then(() => { }).
  catch((error)=>console.error(error));
dbPetition.Model.sync()
  .then(() => {})
  .catch((error)=>console.error(error));
dbUser.Model.sync().then(
  () => { }).
  catch((error)=>console.error(error));
*/
const includePetition = [
        { model: dbUser.Model },
        { model: dbCaterogy.Model },
        { model: dbTypeDestination.Model },
        { model: dbType.Model },
        { model: dbState.Model },
        { model: dbComment.Model, include: {model:dbUser.Model} },
      ];
 const includeUser = [{model: dbPetition.Model, include: {model:dbComment.Model, include:{model:dbUser.Model}}, limit:10}, 
                      {model:dbTypeUser.Model}];

dbUser.Model.searchByTittle = (query)=> new Promise((resolve, reject)=>{
  const Op = Sequelize.Op;
  let whereQuery = {where:{}, include:includeUser};
  whereQuery.where[query.key] = {[Op.like]: `%${query.value}%`};
  User.findAll(whereQuery).then(users => {
    resolve(users);
  }).catch((err) => {
      reject(err);
  });
});

dbUser.Model.paginateFind = (skip, limit, sort, page) => new Promise((resolve, reject)=>{
  const query = {include:includeUser, offset:skip,limit:limit,...sort};
  //const query = { offset: skip, limit: limit, ...sort, };
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

dbPetition.Model.searchByTittle = (query)=> new Promise((resolve, reject)=>{
  const Op = Sequelize.Op;
  let whereQuery = {where:{},include: includePetition};
  whereQuery.where[query.key] = {[Op.like]: `%${query.value}%`};
  dbPetition.Model.findAll(whereQuery).then(users => {
    resolve(users);
  }).catch((err) => {
      reject(err);
  });
});

dbPetition.Model.paginateFind = (skip, limit, sort, page) => new Promise((resolve, reject)=>{
  
   const query = {
      include: includePetition,
      offset:skip,
      limit:limit,
      ...sort,
  };
  //const query = { offset: skip, limit: limit, ...sort, };
  const count = dbPetition.Model.count();
  const all = dbPetition.Model.findAll(query);
  
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
  Petition:dbPetition.Model,
  TypeDonation:dbType.Model,
  TypeUser:dbTypeUser.Model,
  TypeDestination:dbTypeDestination.Model,
  State: dbState.Model,
  Caterogy: dbCaterogy.Model,
  PetitionComment: dbComment.Model
};
