'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_posts', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userId:{
        type: Sequelize.INTEGER,
        allowNull:false,
        onUpdate: 'CASCADE',
        onDelete:'CASCADE',
        field:'user_id',
        references:{
          model:'users',
          key:'id'
        }
      },
      published:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updated:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
     
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('blog_posts');
     
  }
};
