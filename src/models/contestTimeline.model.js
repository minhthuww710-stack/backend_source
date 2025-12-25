'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContestTimeline extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  ContestTimeline.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      expected_time: DataTypes.BOOLEAN,
      title_en: DataTypes.STRING,
      description_en: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'tb_contest_timeline',
      tableName: 'tb_contest_timeline',
      timestamps: false,
    }
  );
  return ContestTimeline;
};
