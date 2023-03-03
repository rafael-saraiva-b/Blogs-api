const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',{
    post_id:DataTypes.INTEGER,
    category_id:DataTypes.INTEGER
  })

  PostCategory.associate = (models)=> {
    models.BlogPost.belongsToMany(models.Category,{
      as:'categories',
      through:PostCategory,
      foreignKey:'post_id',
      otherKey:'category_id'
    });
    models.Category.belongsToMany(models.BlogPost,{
      as:'blog_posts',
      through:PostCategory,
      foreignKey:'category_id',
      otherKey:'post_id'
    })
  }
  return PostCategory
}

module.exports = PostCategory