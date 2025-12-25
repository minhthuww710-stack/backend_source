'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  Media.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      youtube_url: DataTypes.STRING,
      type: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'tb_media',
      tableName: 'tb_media',
      timestamps: false,
    }
  );
  return Media;
};
