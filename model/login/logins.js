const Sequelize = require('sequelize');
const connection = require("../../database/database");

var database = 'login';

const Login = connection.define( database, {
    user: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});  

//Login.sync({force: false}); // para atualizar o banco apenas

module.exports = Login;