'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContestTopic extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  ContestTopic.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      link_demo: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      name_en: DataTypes.STRING,
      description_en: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'tb_contest_topic',
      tableName: 'tb_contest_topic',
      timestamps: false,
    }
  );
  return ContestTopic;
};
