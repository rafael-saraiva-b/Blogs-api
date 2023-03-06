const express = require('express');
const { userController, categoriesController, postController } = require('./controller');
const { checkNewUser } = require('./middlewares/checkNewUser');
const { checkNewPost } = require('./middlewares/checkNewPost');

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

app.post('/categories', validateJWT, categoriesController.newCategory);

app.get('/categories', validateJWT, categoriesController.getAllCategories);

app.post('/post', validateJWT, checkNewPost, postController.newPost);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
