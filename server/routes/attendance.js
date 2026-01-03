import express from 'express';
import { getAttendance, getTodayStatus, updateAttendance } from '../controllers/attendanceController.js';
import verifyUser from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyUser, getAttendance); // Fetch list
router.get('/status', verifyUser, getTodayStatus); // Check if already clocked in
router.post('/update', verifyUser, updateAttendance); // Perform Clock-In/Out

export default router;