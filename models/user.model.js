const mongoose = require("mongoose");
const { DEFAULT_PROFILE_IMAGE } = require("../config");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "username is already taken!"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email is already taken!"],
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: DEFAULT_PROFILE_IMAGE,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
