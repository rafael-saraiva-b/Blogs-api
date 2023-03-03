const { User } = require('../models');

const getByEmail = (email) => {
const user = User.findOne({ where: { email } });
return user;
};

const newUser = ({ displayName, email, password, image }) => {
  const user = User.create({ displayName, email, password, image });
  return user;
};

module.exports = {
  getByEmail,
  newUser,
};