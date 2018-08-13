require('dotenv').config();

const serverConfig = {
  server: {
    hostname : process.env.SERVER_HOSTNAME,
    port : process.env.SERVER_PORT
  }, 
  pagination: {
    limit: 10,
    skip: 0,
    page: 1,
  },
};

module.exports = serverConfig;