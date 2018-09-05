const http = require('http');
const app = require('./server/');
const serverConfig = require('./server/config/');
const {port, hostname} = serverConfig.server;
const server = http.createServer(app);
//Firebase initialization
const admin = require('firebase-admin');
const serviceAccount = require('./ayudalos-dev-firebase-adminsdk-hkt9x-81fc48233a.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://helpthem-60d1a.firebaseio.com'
});
server.listen(port, ()=>{
  console.log('Running on codeanywhere: ', `${hostname}+${port}`);
});

