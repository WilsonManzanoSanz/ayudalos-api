const Sequelize = require('sequelize');
const {
  Model, 
  fields,
} = require('./model');

const {
  parsePaginationParams,
  parseSortParams,
} = require('./../../../utils/');

const {
  Post,
  User,
  TypeDonation,
  TypeDestination,
  State,
  Caterogy,
} = require('./../posts-user/relations');

const includes = { include:[
        { model: User },
        { model: TypeDonation },
        {model: TypeDestination},
        {model: State},
        {model: Caterogy}
      ]};

exports.id = (req, res, next, id)=>{
  Post.findById(id, includes).then(response=>{
    if(response){
      req.response = response;
      next();
    }else{
      res.json({ 
        success: false,
        message: `Post.displayName not found`
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
    Post.searchByTittle(query).then((response)=>{
      res.json({
      success:true,
      data:response
      });
    }).catch((err) => {
      next(new Error(err));
    });
  } else {
    Post.paginateFind(skip, limit, sort, page).then((response)=>{
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
  
  Post.create(body, includes).then((created) => {
    res.json({
      success:true,
      response:created,
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
      data:response,
    });
};

exports.update = (req, res, next) => {
  const {
    response,
    body,
  } = req;
  response.update(body, includes)
    .then(response => {
      res.json({
        success:true,
        data:response,
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
 response.destroy(response)
  .then((response) => {
    res.json({
      success:true,
      data:response,
    });
  })
  .catch((err) => {
    next(new Error(err));
  });
};