import axios from "axios";
import dotevn from "dotenv";

dotevn.config();
const API_URL = process.env.API_URL;

const addRoom = async (io, socket, data) => {
  
  try {
    const res = await axios.post(API_URL + "rooms", data.room, data.headers);
    if (res.status === 201) {
      io.emit("room:new", {
        success: "room added successfully",
        body: res.data,
      });
      socket.emit("user:redirect", res.data.id)
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
