const { Sequelize } = require('sequelize');
const db_name = process.env.DB_NAME;
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_port = process.env.DB_PORT;
const db_host = process.env.DB_HOST;

const sequelize = new Sequelize(db_name, db_username, db_password, {
  host: db_host,
  port: db_port,
  dialect: 'mysql',
  logging: false,
});

const connectionDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected DB !');
  } catch (error) {
    console.error(error);
  }
};

connectionDB();
