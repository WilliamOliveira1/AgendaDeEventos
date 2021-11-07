// importando o express
const express = require('express');
const app = express();

//Setar o EJS para renderizar o HTML
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Configurar o body-parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
  let errorMessage = "false";
  res.render('index', {
    errorMessage: errorMessage
  });
})

app.get('/registration', (req, res) => {
  let errorMessage = "false";
  res.render('registration', {
    errorMessage: errorMessage
  });
})

app.listen(8080, (error) => {
  if(error) {
    console.error("The server caught an error: " + error);
  }else {
    console.log("The server is running");
  }
});


//Rota da controller login
const loginController = require("./controller/loginController");
const login = require("./model/login/logins");


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