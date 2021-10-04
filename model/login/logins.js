const Sequelize = require('sequelize');
const connection = require("../../database/database");

var database = 'login';

const Login = connection.define( database, {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});  

//Login.sync({force: true}); // para atualizar o banco apenas

module.exports = Login;