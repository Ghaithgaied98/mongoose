const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PersonPrototype = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favouriteFoods: {
    type: [String],
  },
});

module.exports = mongoose.model("Prototype", PersonPrototype);