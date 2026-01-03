import express from 'express';
import { addLeave, getLeaves, getLeaveDetail, updateLeaveStatus } from '../controllers/leaveController.js';
import verifyUser from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', verifyUser, addLeave);
router.get('/', verifyUser, getLeaves); // Used by Admin & Employee (Logic inside controller)
router.get('/:id', verifyUser, getLeaveDetail);
router.put('/:id', verifyUser, updateLeaveStatus);

export default router;