const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
const { checkIfAllExist } = require('./categoryService');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const newPost = async (post, categories) => {
  const categoryCheck = await checkIfAllExist(categories);
  if (categoryCheck.count !== categories.length) {
    return null;
  }
  const result = await sequelize.transaction(async (t) => {
    const postDetails = await BlogPost.create(post, { transaction: t });

    const PostCategoryBulkArray = categories.map((category) => ({
      postId: postDetails.dataValues.id, categoryId: category }));
      
    await PostCategory.bulkCreate(PostCategoryBulkArray, { transaction: t });

    return postDetails;
  });
  return result;
};

const getAllPost = async () => {
  const result = await BlogPost.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
  { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return result;
};

module.exports = {
  newPost,
  getAllPost,
};