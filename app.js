const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const mainRoutes = require("./routes/main.route");
const { globalErrorHandler, noRouteFound } = require("./utils/error.util");
const cookieParser = require("cookie-parser");
const {
  mountSocket,
  closeServerHandler,
} = require("./services/socket.service");

//socket mount
const io = mountSocket(server);

//server cleanup
closeServerHandler(server, io);

//middleware to attach io to every request
app.use((req, res, next) => {
  req.io = io;
  next();
});

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//main routes
app.use("/api/v1", mainRoutes);

//global error handler
app.use(globalErrorHandler);

//no route found
app.use(noRouteFound);

module.exports = server;
