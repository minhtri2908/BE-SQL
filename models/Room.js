//Create Table into DB
import db from './Database.js';
//import mongoose from "mongoose";
import { DataTypes } from 'sequelize';
const RoomSchema = db.define(
  'rooms',
  {
    title: {
      type: DataTypes.STRING,
      required: true,
    },
    price: {
      type: DataTypes.NUMBER,
      required: true,
    },
    image: {
      type: DataTypes.STRING,
      required: true,
    },
    desc: {
      type: DataTypes.STRING,
      required: true,
    },
    maxPeople: {
      type: DataTypes.NUMBER,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  {
    timestamps: true,
  }
);

db.sync();
export default RoomSchema;
