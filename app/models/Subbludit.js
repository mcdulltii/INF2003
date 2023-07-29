const mongoose = require("mongoose");

// Subbludit Schema
var SubbluditSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
});

// Save schema as model
mongoose.model("Subbludit", SubbluditSchema);