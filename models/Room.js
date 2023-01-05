//Create Table into DB
import db from './Database.js';
//import mongoose from "mongoose";
import { DataTypes, Sequelize } from 'sequelize';

var room = db.define('room', {
  number: {
    type: DataTypes.NUMBER,
  },
  unavailableDates: {
    type: DataTypes.ARRAY(DataTypes.DATE),
  },
});

const RoomSchema = db.define(
  'rooms',
  {
    title: {
      type: DataTypes.STRING,
      required: true,
    },
    price: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER,
      required: true,
    },
    roomNumbers: {
      type: DataTypes.JSON,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
  }
);

db.sync();
export default RoomSchema;
