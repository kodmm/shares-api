'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    displayName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    photo: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      }
    },
    provider: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    accessToken:  {
      allowNull: false,
      type: DataTypes.STRING,
    },
    refreshToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};