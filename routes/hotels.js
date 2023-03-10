import express from 'express'
import { byCity, byType, createHotel, getAllHotels, getHotel, getHotelsRoom, deleteHotel, updateHotel } from '../controllers/hotels.js';
import { isAdmin, verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

//For add new hotel only admin can add a new hotel 
router.post('/', verifyToken, isAdmin, createHotel);

router.put("/:id/update", verifyToken, isAdmin, updateHotel);

//For get hotel by id
router.get('/find/:id', getHotel);

//For get all hotels

router.get('/bycity', byCity);
router.get('/bytype', byType);
router.get('/room/:id', getHotelsRoom);
router.delete("/:id", verifyToken, isAdmin, deleteHotel);
router.get('/', getAllHotels);


export default router;