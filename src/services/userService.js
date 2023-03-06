const { User } = require('../models');

const getByEmail = async (email) => {
const user = await User.findOne({ where: { email } });
return user;
};

const getById = async (id) => {
const user = await User.findOne({ where: { id } });
if (!user) {
  return null;
}
const { password, ...userWithoutPassword } = user.dataValues;
console.log(userWithoutPassword);
return userWithoutPassword;
};

const newUser = async ({ displayName, email, password, image }) => {
  const user = await User.create({ displayName, email, password, image });
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll();
  const usersData = users.map(({ dataValues }) => dataValues);
  const usersWithoutPassword = usersData.map(({ password, ...user }) => user);
  return usersWithoutPassword;
};

module.exports = {
  getByEmail,
  newUser,
  getById,
  getAllUsers,
};