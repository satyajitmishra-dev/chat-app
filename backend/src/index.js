import express from 'express';
import auth from './routes/auth.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import messageRoutes from '../src/routes/message.route.js'

dotenv.config();

const app = express();

// ✅ 1. Setup middlewares FIRST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000", // 👈 usually your frontend runs on port 3000
  credentials: true
}));

// ✅ 2. Then load routes
app.use("/api/auth", auth);
app.use("/api/message", messageRoutes)

// ✅ 3. Connect to DB
connectDB();

// ✅ 4. Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
