import axios from "axios";
import dotevn from "dotenv";

dotevn.config();
const API_URL = process.env.API_URL;

const joinRoom = async (io, socket, roomId) => {
  socket.join(roomId);
  socket.broadcast.to(roomId).emit("user:joined", { handle: "handle" });
};

export default joinRoom;
