'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmailTemplate extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  EmailTemplate.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      subject: DataTypes.STRING,
      content: DataTypes.STRING,
      type_filter: DataTypes.STRING,
      quantity_send: DataTypes.INTEGER,
      quantity_send_success: DataTypes.INTEGER,
      status: DataTypes.STRING,
      send_at: DataTypes.DATE,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'tb_email_template',
      tableName: 'tb_email_template',
      timestamps: false,
    }
  );
  return EmailTemplate;
};
