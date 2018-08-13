require('dotenv').config();

const serverConfig = {
  server: {
    hostname : process.env.SERVER_HOSTNAME,
    port : process.env.SERVER_PORT
  }, 
};

module.exports = serverConfig;