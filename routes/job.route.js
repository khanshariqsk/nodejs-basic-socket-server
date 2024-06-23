const express = require("express");
const { handleValidation } = require("../middlewares/validation.middleware");
const {
  saveJob,
  startJob,
  stopJob,
  getJobs,
  getJob,
} = require("../controllers/job.controller");
const { saveJobValidation } = require("../validations/job.validation");

const jobRoutes = express.Router();

jobRoutes.post("/save", handleValidation(saveJobValidation), saveJob);

jobRoutes.patch("/start/:jobId", startJob);

jobRoutes.patch("/stop/:jobId", stopJob);

jobRoutes.get("/", getJobs);
jobRoutes.get("/:jobId", getJob);
module.exports = jobRoutes;
