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

  console.log('user', user);

  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }

  const NewUser = await UserService.newUser({ displayName, email, password, image });

  const token = jwt.sign({ data: { userId: NewUser.id } }, secret, jwtConfig);

  return res.status(201).json({ token });
};

module.exports = {
  login,
  newUser,
};