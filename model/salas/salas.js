const Sequelize = require('sequelize');
const connection = require("../../database/database");

var database = 'salas';

const Salas = connection.define( database, {
    Nome: {
        type: Sequelize.STRING,
        allowNull: false
    }
});  

//Salas.sync({force: true}); // para atualizar o banco apenas

module.exports = Salas;