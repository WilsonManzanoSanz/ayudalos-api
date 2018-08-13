const http = require('http');
const app = require('./server/');
const serverConfig = require('./server/config/');
const {port, hostname} = serverConfig.server;
const server = http.createServer(app);
server.listen(port, ()=>{
  console.log('Running on codeanywhere: ', `${hostname}+${port}`);
});
