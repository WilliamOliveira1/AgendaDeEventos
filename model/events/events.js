const Sequelize = require('sequelize');
const connection = require("../../database/database");

var database = 'events';

const Events = connection.define( database, {
    event: {
        type: Sequelize.STRING,
        allowNull: false
    }
});  

//Events.sync({force: true}); // para atualizar o banco apenas

module.exports = Events;