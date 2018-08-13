const Model = require('./model');

exports.id = (req, res, next, id)=>{
  Model.findById(id).then(data=>{
    if(data){
      req.data = data;
      next();
    }else{
      res.json({ 
        message: `$Model.displayName not found`
      });
    }
  }).catch(err=>{
    next(new Error(err))
  });
}

exports.all = (req, res, next) => {
  Model.findAll().then(user =>{
    res.json(user);
  }).catch((err) => {
    next(new Error(err));
  });
};

exports.create = (req, res, next) => {
  const {
    body,
  } = req;
  Model.create(body).then(response=>{
    res.json(response);
  }).catch((err) => {
    next(new Error(err));
  });
};


exports.read = (req, res, next) => {
  const {
    data,
  } = req;
  res.json(data);
};

exports.update = (req, res, next) => {
  const {
    data,
    body,
  } = req;
  Object.assign(data, body);
  data.save()
    .then((updated) => {
      res.json(updated);
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
  .then((deleted) => {
    res.json(deleted);
  })
  .catch((err) => {
    next(new Error(err));
  });
};