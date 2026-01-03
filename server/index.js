import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToDatabase from './db/db.js';

// Import Routes
import authRouter from './routes/auth.js';
import leaveRouter from './routes/leave.js';
import attendanceRouter from './routes/attendance.js';
import salaryRouter from './routes/salary.js'; // <--- MAKE SURE THIS IS HERE

dotenv.config();
connectToDatabase();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public')); // For images

// --- REGISTER ROUTES ---
app.use('/api/auth', authRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/salary', salaryRouter); // <--- AND THIS MOUNT POINT
// -----------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});