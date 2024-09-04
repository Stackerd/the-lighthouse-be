const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
