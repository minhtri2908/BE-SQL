import express from 'express'

const router = express.Router();
import { newBooking, getAllBooking , getBookingId, UpdateBooking, deleteBooking} from '../controllers/booking.js';
import { isAdmin,verifyToken } from '../utils/verifyToken.js';


router.post('/' , newBooking ); 
router.get('/', verifyToken, isAdmin, getAllBooking);
router.get('/:id', getBookingId);
router.put('/:id/update',verifyToken, isAdmin,UpdateBooking);
router.delete('/:id/delete', deleteBooking);

export default router;