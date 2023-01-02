//Create Table into DB
//import mongoose from "mongoose";
import db from './Database.js';
import { DataTypes } from 'sequelize';
const UsersSchema = db.define(
  'users',
  {
    username: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    fullname: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    country: {
      type: DataTypes.STRING,
      default: '',
    },
    img: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
      default: '',
    },
    phone: {
      type: DataTypes.STRING,
      default: '',
    },
    password: {
      type: DataTypes.STRING,
      default: '',
      required: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  },
  { timestamps: true }
);
db.sync();
export default UsersSchema;
