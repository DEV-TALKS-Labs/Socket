import addRoom from "./roomControllers/addRoom.js";
import joinRoom from "./roomControllers/joinRoom.js";
import leaveRoom from "./roomControllers/leaveRoom.js";

const configureSocket = (io, socket) => {
  socket.on("test", (data) => io.emit("test:res", data));
  socket.on("room:add", (room) => addRoom(io, socket, room));
  socket.on("user:joinRoom", (room) => joinRoom(io, socket, room));
  socket.on("message:send", ({ message, user, roomId }) =>
    io.to(roomId).emit("message:receive", { message, user })
  );
  socket.on("peer:leave", ({ roomId, streamId }) =>
    io.to(roomId).emit("user:peerDisconnected", streamId)
  );
  socket.on("user:leaveRoom", (data) => leaveRoom(io, socket, data));
  socket.on("user:newPeer", ({ roomId, userId }) =>
    io.to(roomId).emit("user:peerConnected", userId)
  );
  socket.on("peer:toggleAudio", ({ roomId, streamId, muted }) =>
    socket.broadcast.to(roomId).emit("peer:toggleAudio", streamId, muted)
  );
};

export default configureSocket;
