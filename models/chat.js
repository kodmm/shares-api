'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chat.belongsTo(models.User, {
        foreignKey: 'user_id',
      })
    }
  }
  Chat.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    video_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    messageType: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['text'],
    },
    message: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        min: 1,
      },
    },
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};