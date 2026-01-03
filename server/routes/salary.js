import express from 'express';
import { addSalary, getSalary, getEmployeeSalary } from '../controllers/salaryController.js';
import verifyUser from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', verifyUser, addSalary);
router.get('/employee/me', verifyUser, getEmployeeSalary); // Specific route FIRST
router.get('/:id', verifyUser, getSalary);
router.get('/', verifyUser, getSalary);

export default router;