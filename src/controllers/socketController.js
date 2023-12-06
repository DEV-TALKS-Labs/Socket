import addRoom from "./roomControllers/addRoom.js";
import joinRoom from "./roomControllers/joinRoom.js";

const configureSocket = (io, socket) => {
  socket.on("test", (data) => io.emit("test:res", data));
  socket.on("room:add", (room) => addRoom(io, socket, room));
  socket.on("user:joinRoom", (room) => joinRoom(io, socket, room));
  socket.on("message:send", ({message, roomId}) => io.to(roomId).emit("message:receive", message));
};

export default configureSocket;
