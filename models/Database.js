import { Sequelize } from "sequelize";

const db = new Sequelize('Booking-hotel', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql'
  });

  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:');
  }

db.sync();

export default db;