const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost',{
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content:DataTypes.STRING,
    user_id:DataTypes.INTEGER,
    published:DataTypes.DATE,
    updated:DataTypes.DATE
  });

  BlogPost.associate = (models)=>{
  BlogPost.belongsTo(models.User,
    {foreignKey: 'user_id',as:'users'})
}
return BlogPost;
}

module.exports = BlogPost