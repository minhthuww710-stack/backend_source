'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      Team.belongsTo(models.tb_contest_topic, { foreignKey: 'topic_id' });
      Team.belongsTo(models.tb_user, { foreignKey: 'userid', as: 'leader' });
      Team.hasMany(models.tb_team_member, { foreignKey: 'team_id', as: 'members' });
    }
  }
  Team.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userid: DataTypes.INTEGER,
      team_name: DataTypes.STRING,
      school_name: DataTypes.STRING,
      faculty_major: DataTypes.STRING,
      topic_id: DataTypes.INTEGER,
      leader_name: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      email: DataTypes.STRING,
      student_code: DataTypes.STRING,
      instructor: DataTypes.STRING,
      amount_member: DataTypes.INTEGER,
      active: DataTypes.BOOLEAN,
      hash: DataTypes.STRING,
      semifinal: DataTypes.BOOLEAN,
      hash_semifinal: DataTypes.STRING,
      final: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'tb_team',
      tableName: 'tb_team',
      timestamps: false,
    }
  );
  return Team;
};
