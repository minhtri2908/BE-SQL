import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';
import { col, fn, cast } from 'sequelize';

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      const hotel = await Hotel.findOne({ where: { id: hotelId } });
      console.log(Object.keys(hotel.rooms).length);
      hotel.rooms = [...hotel.rooms, savedRoom.id];
      await hotel.save();
    } catch (err) {
      next(err);
    }

    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  const id = req.params.id;
  const idUpdate = id;
  try {
    const rooms = await Room.findOne({
      where: fn(
        'JSON_CONTAINS',
        col('roomNumbers'),
        cast(`{"id": ${id}}`, 'CHAR CHARACTER SET utf8')
      ),
    });
    const dataNeedUpdate = rooms.dataValues.roomNumbers.map((item) => {
      if (item.id == idUpdate) {
        item.unavailableDates.push(req.body.date);
        console.log(item.unavailableDates);
        // item.unavailableDates = [...item.unavailableDates, req.body.date];
      }
      return item;
    });
    console.log(dataNeedUpdate);
    await Room.update(
      { roomNumbers: dataNeedUpdate },
      {
        where: fn(
          'JSON_CONTAINS',
          col('roomNumbers'),
          cast(`{"id": ${id}}`, 'CHAR CHARACTER SET utf8')
        ),
      }
    );
    console.log(rooms.dataValues);
    await rooms.save();
    res.status(200).json('Room status has been updated.');
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Room.destroy({ where: { id } });
    const hotel = await Hotel.findOne({
      where: fn('JSON_CONTAINS', col('rooms'), id),
    });
    const newRooms = hotel.dataValues.rooms.filter((room) => room != id);
    await hotel.update(
      { rooms: newRooms },
      { fields: ['rooms'], returning: true }
    );
    res.status(200).json('Phòng đã được xóa');
  } catch (err) {
    next(err);
  }
};

export const getTypeRoom = async (req, res, next) => {
  const id = req.params.id;
  try {
    const rooms = await Room.findAll({
      where: fn(
        'JSON_CONTAINS',
        col('roomNumbers'),
        cast(`{"id": ${id}}`, 'CHAR CHARACTER SET utf8')
      ),
    });
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const room = await Room.findOne({ where: { id: req.params.id } });
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.findAll();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findOne({ where: { id: req.params.id } });
    updatedRoom.title = req.body.title;
    updatedRoom.price = req.body.price;
    updatedRoom.desc = req.body.desc;
    updatedRoom.maxPeople = req.body.maxPeople;
    updatedRoom.roomNumbers = req.body.roomNumbers;
    await updatedRoom.save();
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
