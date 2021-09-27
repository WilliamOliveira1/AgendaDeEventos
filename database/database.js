var Sequelize = require('sequelize');

var dbName = "agendapi";

var connection  = new Sequelize('agendapi', 'user', 'pass', {
  host: 'host',
  dialect: 'mssql',
  driver: 'tedious',
  encrypt: true,
  port: 1433,  
  dialectOptions: {
    encrypt: true, 
    packetSize: 32768, 
    options: {
      useUTC: false, 
      dateFirst: 1, 
      database:'agendapi',
    }
}
});

// Exportando a conexão
module.exports  = connection;