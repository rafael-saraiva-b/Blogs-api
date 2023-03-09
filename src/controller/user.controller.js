require('dotenv/config');
const jwt = require('jsonwebtoken');
const { UserService } = require('../services');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const isloginValid = (email, password) => email && password;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isloginValid(email, password)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const user = await UserService.getByEmail(email);

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' }); 
    }

    const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);

    res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const newUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await UserService.getByEmail(email);

  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }

  const NewUser = await UserService.newUser({ displayName, email, password, image });

  const token = jwt.sign({ data: { userId: NewUser.id } }, secret, jwtConfig);

  return res.status(201).json({ token });
};

const getAllUsers = async (req, res) => {
  const users = await UserService.getAllUsers();

  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const user = await UserService.getById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  await UserService.deleteUser(id);
  return res.status(204).json();
};

module.exports = {
  login,
  newUser,
  getAllUsers,
  getUserById,
  deleteUser,
};