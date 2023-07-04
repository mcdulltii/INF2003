const mongoose = require("mongoose");

// MongoDB Comments
var CommentSchema = new mongoose.Schema({
  comment_message: String,
  post_id: String
});

// Save schema as model
mongoose.model('Comment',CommentSchema);
