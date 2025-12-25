'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamMember extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  TeamMember.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userid: DataTypes.INTEGER,
      team_id: DataTypes.INTEGER,
      member_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      student_code: DataTypes.STRING,
      wallet: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'tb_team_member',
      tableName: 'tb_team_member',
      timestamps: false,
    }
  );
  return TeamMember;
};
