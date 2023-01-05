//Create Table into DB

import { DataTypes, INTEGER, Sequelize } from 'sequelize';
import db from './Database.js';

const HotelSchema = db.define(
  'hotels',
  {
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    type: {
      type: DataTypes.STRING,
      required: true,
    },
    city: {
      type: DataTypes.STRING,
      required: true,
    },
    address: {
      type: DataTypes.STRING,
      required: true,
    },
    image: {
      type: DataTypes.STRING,
      required: true,
    },
    image1: {
      type: DataTypes.STRING,
    },
    image2: {
      type: DataTypes.STRING,
    },
    image3: {
      type: DataTypes.STRING,
    },
    image4: {
      type: DataTypes.STRING,
    },
    image5: {
      type: DataTypes.STRING,
    },
    image6: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.STRING,
      required: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      min: 0,
      max: 10,
    },
    rooms: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    price: {
      type: DataTypes.INTEGER,
      required: true,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true }
);
db.sync();
export default HotelSchema;
