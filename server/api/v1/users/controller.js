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
  Petition,
  PetitionComment,
} = require('./../petitions-user/relations');

const {
  parsePaginationParams,
  parseSortParams,
} = require('./../../../utils/');

const includesAll = { include:[
        { model: Post , limit:10, offset: 0, include: {model:Comments, include:{model:User}}},
        { model: Petition , limit:10, offset: 0, include: {model:PetitionComment, include:{model:User}}},
        { model: TypeUser },
  ]}

exports.id = (req, res, next, id) => {
  let includes = { include:[
        { model: Post , limit:10, offset: 0, include: {model:Comments, include:{model:User}}},
        { model: Petition , limit:10, offset: 0, include: {model:PetitionComment, include:{model:User}}},
        { model: TypeUser },
  ]};
  if(req.query.skip){
    const {
       limit,
      skip
    } = req.query;
     includes.include[0].limit = parseInt(limit);
     includes.include[0].offset = parseInt(skip);
     includes.include[1].limit = parseInt(limit);
     includes.include[1].offset = parseInt(skip);
  }
  User.findByPk(id,includes)
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

exports.create = (req, res, next) => {
  const {
    body,
  } = req;
  
  if(!body.photoURL){
    body.photoURL = 'https://png.icons8.com/color/1600/person-male.png';
  }
  includesAll.where = {uid:body.uid};
  includesAll.defaults = body;
  User.findOrCreate(includesAll)
        .then((obj) => {
          res.json({
            success:true,
            data:obj
          });
      }).catch((error) =>  next(new Error(error)));
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