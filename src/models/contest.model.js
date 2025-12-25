'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contest extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  Contest.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      team_id: DataTypes.INTEGER,
      team_name: DataTypes.STRING,
      team_leader: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      email: DataTypes.STRING,
      topic_id: DataTypes.INTEGER,
      github_url: DataTypes.STRING,
      demo_url: DataTypes.STRING,
      video_url: DataTypes.STRING,
      self_evaluation: DataTypes.STRING,
      pitch_deck_url: DataTypes.STRING,
      document_url: DataTypes.STRING,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'tb_contest',
      tableName: 'tb_contest',
      timestamps: false,
    }
  );
  return Contest;
};
