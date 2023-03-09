const { postService } = require('../services');

const checkUserAuthorization = async (req, res, next) => {
  const { id: tokenId } = req.user;
  const { id: postId } = req.params;
  const post = await postService.getPostById(postId);
  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  const { userId } = post;
  if (tokenId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  return next();
};

module.exports = checkUserAuthorization;