'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmailLog extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  EmailLog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      template_id: DataTypes.INTEGER,
      team_id: DataTypes.INTEGER,
      userid: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      send_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'tb_email_log',
      tableName: 'tb_email_log',
      timestamps: false,
    }
  );
  return EmailLog;
};
