const Sequelize = require('sequelize');
const {
  Model, 
  fields,
} = require('./model');

const {
  User,
  TypeUser,
  Post,
  Comments,
} = require('./../posts-user/relations');

const {
  parsePaginationParams,
  parseSortParams,
} = require('./../../../utils/');

exports.id = (req, res, next, id) => {
  let includes = { include:[
        { model: Post , limit:10, offset: 0, include: {model:Comments, include:{model:User}}},
        { model: TypeUser },
  ]};
  if(req.query.skip){
    const {
       limit,
      skip
    } = req.query;
     includes.include[0].limit = parseInt(limit);
     includes.include[0].offset = parseInt(skip);
  }
  console.log(includes.include[0]);
  User.findById(id,includes)
    .then(response=>{
      if(response){
        req.response = response;
        next();
      }else{
        res.json({ 
          success: false,
          message: `User.displayName not found`
        });
    }
  }).catch(err=>{
    next(new Error(err))
  });
}

exports.all = (req, res, next) => {
    const {
    query,
  } = req;
  
  const {
    limit,
    skip,
    page,
  } = parsePaginationParams(query);
  const sort = parseSortParams(query, fields);
  
  if(query.key){
    User.searchByTittle(query).then((response)=>{
      res.json({
      success:true,
      data:response
      });
    }).catch((err) => {
      next(new Error(err));
    });
  } else {
    User.paginateFind(skip, limit, sort, page).then((response)=>{
      res.json({
        success:true,
        data:response
      });
    }).catch((err) => {
      next(new Error(err));
    });
  }
};

exports.create = (req, res, next) => {
  const {
    body,
  } = req;
  
  if(!body.photoURL){
    body.photoURL = 'https://png.icons8.com/color/1600/person-male.png';
  }
  User.findOrCreate({where: {uid: body.uid}, defaults: body, includes}).spread((user, created) => {
    res.json({
      success:true,
      response:user,
    });
  }).catch((err) => {
      next(new Error(err));
  });
};


exports.read = (req, res, next) => {
  const {
    response,
  } = req;
  res.json({
      success:true,
     data:response
    });
};

exports.update = (req, res, next) => {
  const {
    response,
    body,
  } = req;
  response.update(body)
    .then(response => {
      res.json({
        success:true,
        data:response
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.delete = (req, res, next) => {
  const {
    response,
  } = req;
 response.destroy()
  .then((response) => {
    res.json({
      success:true,
      data:response
    });
  })
  .catch((err) => {
    next(new Error(err));
  });
};