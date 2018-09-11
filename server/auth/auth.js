const admin = require('firebase-admin');
const {Model} = require('../api/v1/users/model');

let authModel = {};

authModel.verifyToken = function(req, res, next){
  const token = req.headers['x-access-token'];
  admin.auth().verifyIdToken(token)
      .then((decodedToken)=> {
        const uid = decodedToken.uid;
        next();
      }).catch(error=>{
        res.status(403).send({
              success: false,
              message: 'No token provided.'
      });
  });
}


authModel.verifySameUser = function(req, res, next){
  const token = req.headers['x-access-token'];
  admin.auth().verifyIdToken(token)
      .then((decodedToken)=> {
        const requestId = (req.body.uid ) ? req.body.uid : req.query.uid;
        if(decodedToken.uid == requestId){
          next();
        }else{
          res.status(203).send({
            error: true,
            message: 'Access denied',
          });
        } 
      }).catch(error=>{
        res.status(403).send({
              success: false,
              message: `Access denied. ${error}`
      });
  });
}

module.exports = authModel;