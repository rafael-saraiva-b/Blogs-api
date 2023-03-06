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

module.exports = { newPost };