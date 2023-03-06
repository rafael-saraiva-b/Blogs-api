const express = require('express');
const { userController } = require('./controller');
const { checkNewUser } = require('./middlewares/checkNewUser');
const validateJWT = require('./middlewares/validateJWT');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...
app.post('/login', userController.login);

app.post('/user', checkNewUser, userController.newUser);

app.get('/user', validateJWT, userController.getAllUsers);

app.get('/user/:id', validateJWT, userController.getUserById);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
