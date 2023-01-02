import express from 'express'
import { createRoom, getAllRooms, getRoom, updateRoom, deleteRoom,getTypeRoom,updateRoomAvailability } from '../controllers/rooms.js';
import { isAdmin, verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

//For add new rooms, only admin can add a new room
router.post('/:hotelId', verifyToken, isAdmin, createRoom); //only als admin login can you add hotels

//Update Room
router.put("/availability/:id", updateRoomAvailability);
//Update Type Room
router.put("/:id/update",  updateRoom);
//For get type room by id
router.get('/typeroom/:id', getTypeRoom);

//For get room by id
router.get('/:id', getRoom);

//For get all rooms
router.get('/', getAllRooms);

//Delete room
router.delete("/:id", verifyToken, isAdmin, deleteRoom);

export default router;