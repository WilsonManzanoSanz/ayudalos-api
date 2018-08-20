require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize  = new Sequelize(process.env.SERVER_DB_NAME, process.env.SERVER_DB_USER, process.env.SERVER_DB_PASS,{
  host:process.env.SERVER_DB_HOSTNAME,
  dialect:'mysql',
  operatorsAliases:false,
  
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
    }
});

const connect = function() {
  sequelize.authenticate()
    .then(()=>{
       console.log('CONNECTION WITH THE DATABASE HAS BEEN STABLISHED');
  })
    .catch((error) =>{
       console.error('BAD ', error);
  });
}

module.exports = {
  db:sequelize,
  connect: connect
};