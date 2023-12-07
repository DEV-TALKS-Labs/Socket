const joinRoom = async (io, socket, {roomId, user}) => {
  socket.join(roomId);
  io.to(roomId).emit("user:joined", user);
};

export default joinRoom;
