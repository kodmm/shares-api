'use strict';
const {
  Model
} = require('sequelize');
const { createSolutionBuilderWithWatch } = require('typescript');
module.exports = (sequelize, DataTypes) => {
  class Watch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Watch.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      Watch.belongsTo(models.Video, {
        foreignKey: 'video_id',
      });
    }
  }
  Watch.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    isWatch: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    video_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genreName: {
      type: DataTypes.ENUM,
      values: ['MOVIE', 'TV']
    }
  }, {
    sequelize,
    modelName: 'Watch',
  });
  

  return Watch;
};