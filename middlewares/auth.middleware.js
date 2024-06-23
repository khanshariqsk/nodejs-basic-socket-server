const { JWT_SECRET } = require("../config");
const { HttpUnAuthenticatedError, HttpUnAuthorisedError } = require("../services/error.service");

const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(new HttpUnAuthenticatedError());
  }

  try {
    const payload = await jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return next(new HttpUnAuthenticatedError());
  }
};

exports.isAdmin = async (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return next(new HttpUnAuthorisedError());
  }
  next();
};
