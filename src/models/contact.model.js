'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  Contact.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      message: DataTypes.STRING,
      status: DataTypes.STRING,
      response_content: DataTypes.STRING,
      created_at: DataTypes.DATE,
      response_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'tb_contact',
      tableName: 'tb_contact',
      timestamps: false,
    }
  );
  return Contact;
};
