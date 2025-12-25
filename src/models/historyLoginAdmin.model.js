'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoryLoginAdmin extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      HistoryLoginAdmin.belongsTo(models.tb_admin, { foreignKey: 'admin_id' });
    }
  }
  HistoryLoginAdmin.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      admin_id: DataTypes.INTEGER,
      user_agent: DataTypes.STRING,
      ip: DataTypes.STRING,
      country_name: DataTypes.STRING,
      region_name: DataTypes.STRING,
      city_name: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      zip_code: DataTypes.STRING,
      as: DataTypes.STRING,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'tb_history_login_admin',
      tableName: 'tb_history_login_admin',
      timestamps: false,
    }
  );
  return HistoryLoginAdmin;
};
