const Sequelize = require('sequelize');
const {
  Model, 
  fields,
} = require('./model');
const {
  parsePaginationParams,
  parseSortParams,
} = require('./../../../utils/');

exports.id = (req, res, next, id)=>{
  Model.findById(id).then(response=>{
    if(response){
      req.response = response;
      next();
    }else{
      res.json({ 
        success: false,
        message: `$Model.displayName not found`
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
    Model.searchByTittle(query).then((response)=>{
      res.json({
      success:true,
      response:response
      });
    }).catch((err) => {
      next(new Error(err));
    });
  } else {
    Model.paginateFind(skip, limit, sort, page).then((response)=>{
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
  
  if(!body.photoURL){
    body.photoURL = 'https://png.icons8.com/color/1600/person-male.png';
  }
  Model.findOrCreate({where: {uid: body.uid}, defaults: body}).spread((user, created) => {
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