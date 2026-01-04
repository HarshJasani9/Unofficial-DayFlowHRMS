import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToDatabase from './db/db.js';

// Import Routes
import authRouter from './routes/auth.js';
import leaveRouter from './routes/leave.js';
import attendanceRouter from './routes/attendance.js';
import salaryRouter from './routes/salary.js';

dotenv.config();
connectToDatabase();

const app = express();

// --- DYNAMIC CORS CONFIGURATION ---
// This allows the server to accept requests from:
// 1. Localhost (for development)
// 2. Your Deployed Frontend (read from .env)
const allowedOrigins = [
    "http://localhost:5173", // Local Development
    process.env.CLIENT_URL   // Deployed Frontend URL (e.g., https://dayflow.vercel.app)
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));
// ----------------------------------

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public')); // Serve uploaded images

// Register Routes
app.use('/api/auth', authRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/salary', salaryRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});