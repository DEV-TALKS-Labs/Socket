const socket = io();

socket.emit("user:joinRoom", { userId, roomId });
socket.emit("room:add", room);

socket.on("room:new", (room) => {
  //add the room to the database and the list of rooms
  console.log(room);
});

socket.on("user:joined", (userId) => {
  //add the user to the call/room with peerjs
  console.log(userId);
});

socket.on("user-leave", (userId) => {
  //close the connection of the room
  console.log(userId);
});

function connectToNewUser(userId, stream) {
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userStream) => {
    addVideoStream(video, userStream);
  });
  call.on("close", () => {
    video.remove();
  });
  peers[userId] = call;
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
}

