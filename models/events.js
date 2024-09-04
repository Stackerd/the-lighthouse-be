const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  location: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Event", eventSchema);
