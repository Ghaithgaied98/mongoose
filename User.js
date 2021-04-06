const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  password: String,
});

module.exports = mongoose.model("User", UserSchema);