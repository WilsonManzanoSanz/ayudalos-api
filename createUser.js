const Sequelize = require('sequelize');
const serverConfig = {
  server: {
    hostname : process.env.SERVER_HOSTNAME,
    port : process.env.SERVER_PORT
  },
  sequelize : new Sequelize('ayudalos', 'root', '',{
  host:'localhost',
  dialect:'mysql',
  operatorsAliases:false,
  
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
    }
  })
};
serverConfig.sequelize.authenticate().then(()=>{
  console.log('OK');
}).catch((error) =>{
  console.error('BAD ', error);
});