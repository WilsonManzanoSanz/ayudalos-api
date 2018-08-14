const admin = require('firebase-admin');

let authModel = {};

authModel.verifyToken = function(req, res, next){
  const token = req.headers['x-access-token'];
  admin.auth().verifyIdToken(token)
      .then((decodedToken)=> {
        const uid = decodedToken.uid;
        next();
      }).catch(rejectAuth);
}


authModel.verifySameUser = function(req, res, next){
  const token = req.headers['x-access-token'];
  admin.auth().verifyIdToken(token)
      .then((decodedToken)=> {
        if(decodedToken.uid === req.query.uid){
          next();
        }else{
          rejectAuth();
        } 
      }).catch(rejectAuth);
}

function rejectAuth(res){
  return res.status(403).send({
          success: false,
          message: 'No token provided.'
  });
}

module.exports = authModel;