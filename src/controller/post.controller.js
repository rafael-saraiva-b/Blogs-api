const { postService } = require('../services');

const newPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  const postParams = { title, content, userId: id };
  const post = await postService.newPost(postParams, categoryIds);
  if (!post) {
  return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  } 
   return res.status(201).json(post); 
};

const getAllPosts = async (req, res) => {
  const result = await postService.getAllPost();
  return res.status(200).json(result);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const result = await postService.getPostById(id);
  if (!result) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  return res.status(200).json(result);
};

module.exports = { 
  newPost,
  getAllPosts,
  getPostById };