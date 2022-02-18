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
      Video.hasMany(models.Watch, {
        foreignKey: 'video_id'
      });
    
      Video.belongsToMany(models.Actor, { through: models.Actorvideo, foreignKey: 'actor_id' });
    }
  }
  Video.init({
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