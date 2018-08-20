const dbUser = require('./../users/model'); 
const dbPost = require('./../posts/model'); 

dbPost.Model.belongsTo(dbUser.Model);  
dbUser.Model.hasMany(dbPost.Model);

dbPost.Model.sync().then(() => {
});

dbUser.Model.sync().then(() => {
});

dbUser.Model.searchByTittle = (query)=> new Promise((resolve, reject)=>{
  const Op = Sequelize.Op;
  let whereQuery = {where:{}};
  whereQuery.where[query.key] = {[Op.like]: `%${query.value}%`};
  User.findAll(whereQuery).then(users => {
    resolve(users);
  }).catch((err) => {
      reject(err);
  });
});

dbUser.Model.paginateFind = (skip, limit, sort, page) => new Promise((resolve, reject)=>{
  
  
  const query = {
      include: [
        {
          model: dbPost.Model,     
        }
      ],
      offset:skip,
      limit:limit,
      ...sort,
  };
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

module.exports = {
  User: dbUser.Model,
  Post:dbPost.Model
};
