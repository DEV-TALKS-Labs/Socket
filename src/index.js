import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";

import configureSocket from "./controllers/socketController.js";
//------------------------//
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//------------------------//


dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
  allowEIO3: true,
});
const PORT = process.env.PORT || 3002;
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html");
// });
//
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);
  configureSocket(io, socket);
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Socket.IO server listening on *:${PORT}`);
});
