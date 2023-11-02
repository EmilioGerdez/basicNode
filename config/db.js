const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOSTNAME,
    dialect: 'postgres'
  }
);

async function connectDB() {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

module.exports = {db,connectDB, Sequelize, DataTypes};

