const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const databaseConfig = require('./database');
const api = require('./api/v1/');
const admin = require('firebase-admin');
const apiRoutes = express.Router();

apiRoutes.use((req, res, next) => {
  const token = req.headers['x-access-token'];
  admin.auth().verifyIdToken(token)
      .then((decodedToken)=> {
        const uid = decodedToken.uid;
        next();
      }).catch((error)=> {
         return res.status(403).send({
          success: false,
          message: 'No token provided.'
        });
      });
});
app.use('/api', apiRoutes);

databaseConfig.connect();

app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(bodyParser.json());

app.use('/api/v1', api);
app.use('/api', api);

app.use((req, res, next) => {
  res.status(404);
  res.json({
    error: true,
    message: 'Not found',
  });
});

app.use((err, req, res, next) => {
  let {
    statusCode = 500, message,
  } = err;
  switch (err.type) {
    case 'entity.parse.failed':
      message = `Bad Request: ${err.message}`;
      break;
    default:
      if (err.message.startsWith('ValidationError')) {
        statusCode = 422;
      }
      break;
  }
  res.status(statusCode);
  res.json({
    error: true,
    message: message,
  });
});

module.exports = app;