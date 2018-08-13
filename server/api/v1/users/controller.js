const Model = require('./model');

exports.id = (req, res, next, id)=>{
  Model.findById(id).then(data=>{
    if(data){
      req.data = data;
      next();
    }else{
      res.json({ 
        sucess: false,
        message: `$Model.displayName not found`
      });
    }
  }).catch(err=>{
    next(new Error(err))
  });
}

exports.all = (req, res, next) => {
  Model.findAll().then(response =>{
    res.json({
      sucess:true,
      data:response,
    });
  }).catch((err) => {
    next(new Error(err));
  });
};

exports.create = (req, res, next) => {
  const {
    body,
  } = req;
  Model.create(body).then(response=>{
    res.json({
      sucess:true,
      data:response,
    });
  }).catch((err) => {
    next(new Error(err));
  });
};


exports.read = (req, res, next) => {
  const {
    data,
  } = req;
  res.json({
      sucess:true,
      data:response,
    });
};

exports.update = (req, res, next) => {
  const {
    data,
    body,
  } = req;
  Object.assign(data, body);
  data.save()
    .then(response => {
      res.json({
        sucess:true,
        data:response,
    });
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.delete = (req, res, next) => {
  const {
    data,
  } = req;
 data.remove()
  .then((response) => {
    res.json({
      sucess:true,
      data:response,
    });
  })
  .catch((err) => {
    next(new Error(err));
  });
};