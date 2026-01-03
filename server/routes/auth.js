import express from 'express';
import { login, register, verify, addEmployee, getEmployees, getEmployee, updateEmployee } from '../controllers/authController.js'; 
import verifyUser from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// --- MULTER CONFIGURATION ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Save here
    },
    filename: (req, file, cb) => {
        // Name format: fieldname_date.jpg
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
// ----------------------------

router.post('/login', login);
router.get('/verify', verifyUser, verify);
router.post('/register', register);

// Protected Routes
router.post('/add-employee', verifyUser, addEmployee);
router.get('/employees', verifyUser, getEmployees);
router.get('/employees/:id', verifyUser, getEmployee);

// UPDATE ROUTE: Add 'upload.single' middleware
router.put('/employees/:id', verifyUser, upload.single('image'), updateEmployee);

export default router;