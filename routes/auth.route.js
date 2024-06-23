const express = require("express");
const { signup, signin, stopJob } = require("../controllers/auth.controller");
const { handleValidation } = require("../middlewares/validation.middleware");
const {
  signupValidation,
  signinValidation,
} = require("../validations/auth.validation");
const { saveJobValidation } = require("../validations/job.validation");

const authRoutes = express.Router();

authRoutes.post("/signup", handleValidation(signupValidation), signup);

authRoutes.post("/signin", handleValidation(signinValidation), signin);


module.exports = authRoutes;
