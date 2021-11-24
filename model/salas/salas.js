const Sequelize = require('sequelize');
const connection = require("../../database/database");
const Agenda = require('../Agenda/agenda');

var database = 'salas';

const Salas = connection.define( database, {
    Nome: {
        type: Sequelize.STRING,
        allowNull: false
    }
});  

//Salas.sync({force: true}); // para atualizar o banco apenas

// Relacionamento 1 - 1 (Um Article pertence à uma Category)
//Agenda.belongsTo(Salas);
// Relacionamento 1 - N (Uma Category tem muitos Article)
//Salas.hasMany(Agenda);

module.exports = Salas;