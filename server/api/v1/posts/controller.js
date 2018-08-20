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
} = require('./../posts-user/relations');

exports.id = (req, res, next, id)=>{
  Post.findById(id).then(response=>{
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
      response:response
      });
    }).catch((err) => {
      next(new Error(err));
    });
  } else {
    Post.paginateFind(skip, limit, sort, page).then((response)=>{
      res.json({
        success:true,
        response:response
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
  
  Post.create(body).then((created) => {
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
      response:response,
    });
};

exports.update = (req, res, next) => {
  const {
    response,
    body,
  } = req;
  Object.assign(response, body);
  response.save()
    .then(response => {
      res.json({
        success:true,
        response:response,
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
      response:response,
    });
  })
  .catch((err) => {
    next(new Error(err));
  });
};