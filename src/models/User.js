
const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User',{
    id: DataTypes.INTEGER,
    display_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  })
  User.associate = (models) => {
    User.hasMany(models.BlogPost,{
      foreignKey:'user_id',as:'posts'
    })
  }
  return User
}

module.exports = User;