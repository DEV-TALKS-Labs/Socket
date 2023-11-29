import axios from "axios";
import dotevn from "dotenv";

dotevn.config();
const API_URL = process.env.API_URL;

const joinRoom = async (io, socket, { handle, roomId }) => {
  console.log("a user connected: ", socket.id);
  socket.join(roomId);
  socket.broadcast.to(roomId).emit("user:joined", { handle });
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    // socket.to(roomId).broadcast.emit("user-leave", handle);
  });
  //   try {
  //     const res = await axios.post(API_URL + "rooms", room);
  //     if (res.status === 201) {
  //       io.emit("add room", {
  //         success: "room added successfully",
  //         body: res.data,
  //       });
  //     } else {
  //       socket.emit("errorHandler", {
  //         error: "faild to add room",
  //         message: res.data,
  //       });
  //     }
  //   } catch (err) {
  //     socket.emit("errorHandler", {
  //       error: "faild to add task",
  //       message: err.message,
  //     });
  //   }
};

export default joinRoom;
