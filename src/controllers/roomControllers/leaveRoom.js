import axios from "axios";
import dotevn from "dotenv";

dotevn.config();
const API_URL = process.env.API_URL;

const leaveRoom = async (io, socket, { roomId, userId }) => {
  try {
    const res = await axios.patch(`${API_URL}rooms/${roomId}/leave`, 
    {
      id: userId,
    });
    socket.leave(roomId);
    if (res.status === 204) {
      io.emit("room:delete", roomId);
      io.to(roomId).broadcast.emit("user:left", userId);
    } else if (res.status === 200) {
      io.to(roomId).broadcast.emit("user:left", userId);
    }
} catch (err) {
    socket.emit("errorHandler", {
      error: "faild to leave room",
      message: err.message,
    });
  }
};

export default leaveRoom;
