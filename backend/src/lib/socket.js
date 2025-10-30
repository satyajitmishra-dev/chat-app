import {Server} from 'socket.io';
import http from 'http';
import express from 'express';
import { log } from 'console';


const app = express();
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin:["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Use to store onlineUsers
const userSocketMap = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }
 io.emit("getOnlineUsers", Object.keys(userSocketMap));
 console.log("Online users : ", Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export {io, server, app};