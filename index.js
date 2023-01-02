import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import hotelsRoutes from './routes/hotels.js'
import usersRoutes from './routes/users.js'
import roomsRoutes from './routes/rooms.js'
import bookingRoutes from './routes/booking.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


//Create Port for Backend
const app = express();

dotenv.config();


app.use(cors({
    credentials: true,
    origin: process.env.FRONT_END_DOMAIN
}));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/booking', bookingRoutes);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Error!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

app.listen(5000, () => {
    console.log(`app listening at port http://localhost:5000`);
});