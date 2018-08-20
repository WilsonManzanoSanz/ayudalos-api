const dbUser = require('./../users/model'); 
const dbPost = require('./../posts/model'); 
const dbCaterogy = require('./../category-donations/model'); 
const dbTypeDestination = require('./../type-destinations/model'); 
const dbType = require('./../type-donations/model'); 
const dbState = require('./../states/model'); 

dbPost.Model.belongsTo(dbUser.Model);  
dbUser.Model.hasMany(dbPost.Model);
// Post relations
dbPost.Model.belongsTo(dbCaterogy.Model);  
//dbCaterogy.Model.hasOne(dbPost.Model);
dbPost.Model.belongsTo(dbTypeDestination.Model);  
//dbCaterogy.Model.hasOne(dbPost.Model);
dbPost.Model.belongsTo(dbType.Model);  
//dbCaterogy.Model.hasOne(dbPost.Model);
dbPost.Model.belongsTo(dbState.Model);  
//dbCaterogy.Model.hasOne(dbPost.Model);

dbPost.Model.sync().then(() => {
});

dbUser.Model.sync().then(() => {
});

const include = [
        { model: dbUser.Model },
        { model: dbCaterogy.Model },
        { model: dbTypeDestination.Model },
        { model: dbType.Model },
        { model: dbState.Model },
      ];

dbUser.Model.searchByTittle = (query)=> new Promise((resolve, reject)=>{
  const Op = Sequelize.Op;
  const include = [{model: dbPost.Model}];
  let whereQuery = {where:{}, include:include};
  whereQuery.where[query.key] = {[Op.like]: `%${query.value}%`};
  User.findAll(whereQuery).then(users => {
    resolve(users);
  }).catch((err) => {
      reject(err);
  });
});

dbUser.Model.paginateFind = (skip, limit, sort, page) => new Promise((resolve, reject)=>{
 
  const include = [{model: dbPost.Model}];
  const query = {include:include, offset:skip,limit:limit,...sort};
  //const query = { offset: skip, limit: limit, ...sort, };
  const count = dbUser.Model.count();
  const all = dbUser.Model.findAll(query);
  
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

dbPost.Model.searchByTittle = (query)=> new Promise((resolve, reject)=>{
  const Op = Sequelize.Op;
  let whereQuery = {where:{},include: include};
  whereQuery.where[query.key] = {[Op.like]: `%${query.value}%`};
  dbPost.Model.findAll(whereQuery).then(users => {
    resolve(users);
  }).catch((err) => {
      reject(err);
  });
});

dbPost.Model.paginateFind = (skip, limit, sort, page) => new Promise((resolve, reject)=>{
  
   const query = {
      include: include,
      offset:skip,
      limit:limit,
      ...sort,
  };
  //const query = { offset: skip, limit: limit, ...sort, };
  const count = dbPost.Model.count();
  const all = dbPost.Model.findAll(query);
  
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
  User: dbUser.Model,
  Post:dbPost.Model
};
