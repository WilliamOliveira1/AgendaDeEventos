// importando o express
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const authCheck = require('./middleware/loginCheck')

//Setar o EJS para renderizar o HTML
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', "Content-Type, Authorization");
  res.header('Authorization', "");
  next();
});

// Configurar o body-parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
  let message = "false";
  res.render('index', {
    message: message
  });
})

app.get('/registration', (req, res) => {
  let message = "false";
  res.render('registration', {
    message: message
  });
})

app.get('/home', (req, res) => {
  let message = "false";
  res.render('agenda', {
    message: message
  });
})

app.get('/agenda', (req, res) => {
  let message = "false";
  res.render('agenda', {
    message: message
  });
})

app.get('/dashboard', (req, res) => {
  let message = "false";
  res.render('dashboard', {
    message: message
  });
})

app.get('/overview', (req, res) => {
  let message = "false";
  res.render('overview', {
    message: message
  });
})

app.listen(8080, (error) => {
  if(error) {
    console.error("The server caught an error: " + error);
  }else {
    console.log("The server is running");
  }
});


//Rota das controllers
const loginController = require("./controller/Login/loginController");
const agendaController = require("./controller/Agenda/agendaController");
const roomsController = require("./controller/Salas/roomsController");
const eventsController = require("./controller/Events/eventsController");

// importando a connection do banco de dados
const connection = require("./database/database");
// Conectar com o banco de dados
connection
  .authenticate()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((msgErro) => {
    console.log("Error: " + msgErro);
  });

//Utilizando as rotas da controller
app.use("/", loginController);

//Utilizando as rotas da controller
app.use("/", agendaController);

//Utilizando as rotas da controller
app.use("/", roomsController);

//Utilizando as rotas da controller
app.use("/", eventsController);