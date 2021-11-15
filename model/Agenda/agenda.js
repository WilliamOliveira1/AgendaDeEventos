const Sequelize = require('sequelize');
const connection = require("../../database/database");

var database = 'Agenda';

const Agenda = connection.define( database, {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    start: {
        type: Sequelize.DATE,
        allowNull: false
    },
    end: {
        type: Sequelize.DATE,
        allowNull: false
    },
    allDay: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});  

//Agenda.sync({force: true}); // para atualizar o banco apenas

module.exports = Agenda;
