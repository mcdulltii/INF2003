const getConnection = require("../app");
const express = require('express');
const mongoose = require("mongoose");

// ExpressJS routing
const router = express.Router();

// Models
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

async function runSQLQuery(query) {
  let conn;
  try {
    // Make a connection to MariaDB
    conn = await getConnection();

    // Run the query
    var rows = await conn.query(query);

    // Return the results
    return rows;
  } catch (err) {
    return err;
  } finally {
    if (conn) conn.release();
  }
}

// Create a route to get all users from MySQL
router.get("/users", (req, res) => {
  res.json(runSQLQuery("SELECT * FROM users"));
});

// Create a route to get all forums from MySQL
router.get("/forums", (req, res) => {
  res.json(runSQLQuery("SELECT * FROM forums"));
});

// Create a route to get all posts from MySQL
router.get("/posts", (req, res) => {
  res.json(runSQLQuery("SELECT * FROM posts"));
});

// Create a route to get all votes from MySQL
router.get("/votes", (req, res) => {
  res.json(runSQLQuery("SELECT * FROM votes"));
});



// Route to add a post to MongoDB
router.post("/posts/add", async (req, res) => {
  var post = new Post();

  post.post_id = req.body.post_id;
  post.post_title = req.body.post_title;
  post.subreddit = req.body.subreddit;
  post.post_url = req.body.post_url;
  post.flair_text = req.body.flair_text;
  post.post_datetime = req.body.post_datetime ?? new Date().toISOString().slice(0, 19);
  
  await post.save();
  res.json(post);
});

// Create a route to get all posts from MongoDB
router.get("/posts/get", async (req, res) => {
  res.json(await Post.find({}));
});

// Route to get a specific post from MongoDB
router.get("/posts/get/:post_id", async (req, res) => {
  res.json(await Post.find({ post_id: req.params.post_id }));
});

// Route to search for a post from MongoDB
router.get("/posts/search/:search_term", async (req, res) => {
  res.json(await Post.find({ post_title: { $regex: req.params.search_term, $options: "i" } }));
});

// Route to update a post in MongoDB
router.post("/posts/update/:post_id", async (req, res) => {
  var post = await Post.findOne({ post_id: req.params.post_id });
  
  // Only update the fields that were passed in
  post.post_title = req.body.post_title ?? post.post_title;
  post.subreddit = req.body.subreddit ?? post.subreddit;
  post.post_url = req.body.post_url ?? post.post_url;
  post.flair_text = req.body.flair_text ?? post.flair_text;
  post.post_datetime = req.body.post_datetime ?? post.post_datetime;
  
  await post.save();
  res.json(post);
});

// Route to delete a post from MongoDB
router.post("/posts/delete/:post_id", async (req, res) => {
  var post = await Post.findOneAndRemove({ post_id: req.params.post_id });
  res.json(post);
});

// Route to add a comment to MongoDB
router.post("/comments/add", async (req, res) => {
  var comment = new Comment(req.body);
  await comment.save();
  res.json(comment);
});

// Create a route to get all comments from MongoDB
router.get("/comments/get", async (req, res) => {
  res.json(await Comment.find({}));
});

// Route to get comments from a specific post from MongoDB
router.get("/comments/get/:post_id", async (req, res) => {
  res.json(await Comment.find({ post_id: req.params.post_id }));
});

// Route to get a specific comment using _id from MongoDB
router.get("/comments/get/id/:_id", async (req, res) => {
  var comment = await Comment.findOne({ _id: req.params._id });
  res.json(comment);
});

// Route to update a comment in MongoDB
router.post("/comments/update/:_id", async (req, res) => {
  var comment = await Comment.findOne({ _id: req.params._id });
  
  // Only update the fields that were passed in
  comment.comment_message = req.body.comment_message ?? comment.comment_message;
  
  await comment.save();
  res.json(comment);
});

// Route to delete a comment from MongoDB
router.post("/comments/delete/:_id", async (req, res) => {
  var comment = await Comment.findOneAndRemove({ _id: req.params._id });
  res.json(comment);
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

module.exports = router;

