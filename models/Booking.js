//Create Table into DB
import db from './Database.js';
import { DataTypes, Sequelize } from 'sequelize';

const bookingSchema = db.define(
  'bookings',
  {
    roomId: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    hotel: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    fullname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    fromDate: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    request: {
      type: DataTypes.STRING,
    },
    toDate: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
    },
    totalDays: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
    },
    transactionId: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
      defaultValue: 'đang thanh toán',
    },
  },
  { timestamps: true }
);
db.sync();
export default bookingSchema;
