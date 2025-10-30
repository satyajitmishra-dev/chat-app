import express from 'express';
import auth from './routes/auth.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import messageRoutes from '../src/routes/message.route.js'
import { app, server } from './lib/socket.js';
import path from 'path';
dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();


// ✅ 1. Setup middlewares FIRST
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5174",
    "http://localhost:5173"
  ], // usually your frontend runs on these ports
  credentials: true
}));

//  2. Then load routes
app.use("/api/auth", auth);
app.use("/api/message", messageRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {  
    res.sendFile(path.join(__dirname, '/frontend', 'dist', 'index.html'));
  });
}

//  3. Connect to DB
connectDB();

//  4. Start server
server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
