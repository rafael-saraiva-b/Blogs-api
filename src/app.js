const express = require('express');
const { userController, categoriesController, postController } = require('./controller');
const { checkNewUser } = require('./middlewares/checkNewUser');
const { checkNewPost, checkUpdatingPost } = require('./middlewares/checkNewPost');
const checkUserAuthorization = require('./middlewares/checkUserAuthorization');

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

app.get('/post', validateJWT, postController.getAllPosts);

app.get('/post/:id', validateJWT, postController.getPostById);

app.put('/post/:id',
 validateJWT,
  checkUserAuthorization,
   checkUpdatingPost,
    postController.updatePost);

app.delete('/post/:id', validateJWT, checkUserAuthorization, postController.deletePostById);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
