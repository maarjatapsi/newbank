const mongoose = require("mongoose");
const randtoken = require('rand-token');

const token = randtoken.generate(16);

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"]
  },
  username: {
    type: String,
    required: [true, "Username required"],
    unique: [true, "User already exists"],
    dropDups: [true, "User already exists"]
  },
  password: {
    type: String,
    required: [true, "Password Required"]
  },
  token: {
    type: String,
    default: token
  }
});



module.exports = mongoose.model("Users", UserSchema);