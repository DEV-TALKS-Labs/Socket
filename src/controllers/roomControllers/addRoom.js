import axios from "axios";
import dotevn from "dotenv";

dotevn.config();
const API_URL = process.env.API_URL;

const addRoom = async (io, socket, room) => {
  try {
    const res = await axios.post(API_URL + "rooms", room);
    if (res.status === 201) {
      io.emit("room:new", {
        success: "room added successfully",
        body: res.data,
      });
    } else {
      socket.emit("errorHandler", {
        error: "faild to add room",
        message: res.data,
      });
    }
  } catch (err) {
    socket.emit("errorHandler", {
      error: "faild to add task",
      message: err.message,
    });
  }
};

export default addRoom;
