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
   "https://dayflow99.netlify.app"   // Deployed Frontend URL (e.g., https://dayflow.vercel.app)
];

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://dayflow99.netlify.app"
    ];

    // Allow requests with no origin (Postman, curl, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // IMPORTANT: allow but do not throw error
      callback(null, false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


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