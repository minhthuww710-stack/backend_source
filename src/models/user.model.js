'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      User.belongsTo(models.tb_team, { foreignKey: 'team_id', as: 'teams' });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      wallet: DataTypes.INTEGER,
      team_id: DataTypes.STRING,
      role: DataTypes.STRING,
      active: DataTypes.STRING,
      created_at: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'tb_user',
      tableName: 'tb_user',
      timestamps: false,
    }
  );
  return User;
};
