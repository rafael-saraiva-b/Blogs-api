const { User } = require('../models');

const getByEmail = (email) => {
  console.log(email);
const user = User.findOne({ where: { email } });
return user;
};

module.exports = {
  getByEmail,
};