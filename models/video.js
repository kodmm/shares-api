'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Video.belongsToMany(models.User, { through: models.Watch, foreignKey: 'video_id'});
      Video.belongsToMany(models.Actor, { through: models.ActorVideo, foreignKey: 'video_id' });
    }
  }
  Video.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poster_path: {
      type: DataTypes.STRING,
    },
    overview: {
      type: DataTypes.TEXT,
    }
  }, {
    sequelize,
    modelName: 'Video',
  });
  
  return Video;
};