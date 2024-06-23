const { Server } = require("socket.io");
const socketEmitter = require("./event-emitter.service");
const mountSocket = (server) => {
  //configuring socket
  const io = new Server(server, {
    cors: {
      origins: ["*"],
    },
  });

  //socket connection
  io.on("connection", (socket) => {
    console.log("a user connected");

    setInterval(() => {
      io.emit("message", new Date().toISOString());
    }, 5000);
  });

  socketEmitter.on("event-sender", ({ eventName, eventData }) => {
    console.log({ eventName, eventData });
    io.emit(eventName, eventData);
  });

  return io;
};

const shutdownServer = async (server, io) => {
  console.log("Closing server gracefully...");

  //Remove all sockerEmitter listeners
  socketEmitter.removeAllListeners();

  //Close server and socket.io connections
  server.close(() => {
    console.log("Server closed.");
    io.close(() => {
      console.log("Socket.io connections closed.");
    });
    process.exit(0);
  });
};

const closeServerHandler = (server, io) => {
  // Listen for shutdown signals
  process.on("SIGINT", () => {
    shutdownServer(server, io);
  });
  process.on("SIGTERM", () => {
    shutdownServer(server, io);
  });
  process.on("SIGQUIT", () => {
    shutdownServer(server, io);
  });
};

module.exports.mountSocket = mountSocket;
module.exports.closeServerHandler = closeServerHandler;
