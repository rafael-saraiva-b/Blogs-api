const express = require('express');
const { userController } = require('./controller');
const { checkNewUser } = require('./middlewares/checkNewUser');

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

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
