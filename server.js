const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const server = require("./app");
const { MONGODB_URL, SERVER_PORT } = require("./config");
const { startAllActiveJobs } = require("./services/job.service");

const PORT = SERVER_PORT || 3000;

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("successfully connected to db");

    server.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}`);
      await startAllActiveJobs();
    });
  } catch (error) {
    console.log("error connecting to db");
  }
};

startServer();
