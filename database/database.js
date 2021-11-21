var Sequelize = require('sequelize');

var connection  = new Sequelize('agendapi', process.env.SQL_USER, process.env.SQL_SECRET, {
  host: 'agendapi.database.windows.net',
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