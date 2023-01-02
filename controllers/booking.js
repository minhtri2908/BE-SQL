import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import moment from 'moment';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';

export const newBooking = async (req, res) => {
  const {
    roomId,
    userId,
    hotel,
    fullname,
    email,
    phone,
    request,
    totalPrice,
    totalDays,
    fromDate,
    toDate,
  } = req.body;

  try {
    const newBooking = new Booking({
      hotel: hotel,
      roomId: roomId,
      userId: userId,
      fullname: fullname,
      email: email,
      phone: phone,
      request: request,
      fromDate: fromDate,
      toDate: toDate,
      totalPrice: totalPrice,
      totalDays: totalDays,
      transactionId: uuidv4(),
    });

    const booking = await newBooking.save();
    const id = req.body.roomId;
    res.send('Đặt phòng thành công');
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getBookingUserId = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.params.id });
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

export const getAllBooking = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

export const UpdateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: req.body.status,
        },
      },
      { new: true }
    );
    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};

export const getBookingId = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: true,
      message: 'Booking has been deleted.',
    });
  } catch (err) {
    next(err);
  }
};
