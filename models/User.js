const mongoose = require("mongoose");
const randtoken = require('rand-token');

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
    default: () => randtoken.generate(32)
  }
});



module.exports = mongoose.model("Users", UserSchema);
