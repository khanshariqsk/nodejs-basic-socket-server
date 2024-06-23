const { JWT_SECRET, DEFAULT_PROFILE_IMAGE } = require("../config");
const jwt = require("jsonwebtoken");

exports.generateToken = (userData) => {
  return jwt.sign({ id: userData._id, isAdmin: userData.isAdmin }, JWT_SECRET);
};

exports.getUserInfo = (userData) => {
  return {
    _id: userData._id,
    username: userData.username,
    email: userData.email,
    profilePicture: userData.profilePicture || DEFAULT_PROFILE_IMAGE,
    isAdmin: !!userData.isAdmin,
  };
};
