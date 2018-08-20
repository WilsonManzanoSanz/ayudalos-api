const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const databaseConfig = require('./database');
const api = require('./api/v1/');

//CORS
var cors = require('cors');
app.use(cors());
// Dabatabase connection
databaseConfig.connect();

// Body controll
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(bodyParser.json());
// Api version
app.use('/api/v1', api);
app.use('/api', api);
//Default rejection
app.use((req, res, next) => {
  res.status(404);
  res.json({
    error: true,
    message: 'Not found',
  });
});

app.use((req, res, next) => {
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