const { Op } = require('sequelize');
const { Category } = require('../models');

const addCategory = async (name) => {
  const category = await Category.create({ name });
  return category;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

const checkIfAllExist = async (ids) => {
  const searchebleIds = ids.map((id) => ({ id }));
  console.log('searchebleIds', searchebleIds);
  const category = await Category.findAndCountAll({ where: {
    [Op.or]: searchebleIds } });
  return category;
};

module.exports = {
  addCategory,
  getAllCategories,
  checkIfAllExist,
};