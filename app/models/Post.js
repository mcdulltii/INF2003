const mongoose = require("mongoose");

// MongoDB Posts
var PostSchema = new mongoose.Schema({
  post_id: String,
  post_datetime: String,
  post_title: String,
  subreddit: String,
  post_url: String,
  flair_text: String
});

// Save schema as model
mongoose.model('Post',PostSchema);
