const mongoose = require("mongoose");
const randtoken = require('rand-token');

const AccountSchema = mongoose.Schema({
  account_number: {
    type: String,
    default: () => randtoken.generate(32)
  },
  balance: {
      type: Number,
      default: 200,
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  }
});


module.exports = mongoose.model("Account", AccountSchema);
