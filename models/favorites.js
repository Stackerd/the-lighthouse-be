const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  id: {
    required: true,
    type: String,
  },
  favorite: {
    required: true,
    type: Boolean,
  },
  text: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Favorite", favoriteSchema);
