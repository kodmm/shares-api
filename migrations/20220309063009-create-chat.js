'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      video_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      messageType: {
        type: Sequelize.ENUM,
        values: ['text'],
        allowNull: false,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Chats');
  }
};