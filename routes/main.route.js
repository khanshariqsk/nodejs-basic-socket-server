const express = require("express");
const authRoutes = require("./auth.route");
const jobRoutes = require("./job.route");

const mainRoutes = express.Router();

mainRoutes.use("/auth", authRoutes);
mainRoutes.use("/jobs", jobRoutes);

module.exports = mainRoutes;
