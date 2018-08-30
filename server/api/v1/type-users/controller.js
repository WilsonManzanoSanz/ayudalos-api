const Sequelize = require('sequelize');
const {
  Model, 
  fields,
} = require('./model');

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
  Model.findAll()
    .then((response) => {
      res.json({
        success: true,
        items: response,
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
  
  Model.create(body).then((response) => {
    res.json({
      success:true,
      data:response
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
  console.log('update');
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