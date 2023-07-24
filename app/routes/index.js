const getConnection = require("../app");
const express = require('express');
const mongoose = require("mongoose");

// ExpressJS routing
const router = express.Router();

// Models
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

// Default variables
const page_offset = 10;

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

  // if post_id is not passed in, generate a random 7 length string
  post.post_id = req.body.post_id ?? Math.random().toString(36).substring(2, 9);
  post.post_title = req.body.post_title;
  post.subreddit = req.body.subreddit ?? "All";
  post.post_url = req.body.post_url ?? "localhost:8000/#/indivpost/" + post.post_id;
  post.flair_text = req.body.flair_text ?? "test";
  post.post_datetime = req.body.post_datetime ?? new Date().toISOString().slice(0, 19);
  post.post_content = req.body.post_content ?? "";

  await post.save();
  res.json(post);
});

// Create a route to get posts by page offsets from MongoDB
router.get("/posts/:current_page", async (req, res) => {
  // get number of pages
  var num_posts = await Post.countDocuments({});
  var num_pages = Math.ceil(num_posts / page_offset);

  var posts = await Post.find({}).sort({'post_datetime': -1}).skip(req.params.current_page * page_offset).limit(page_offset);

  res.json({
    num_pages: num_pages,
    posts: posts
  });
});

// Route to get a specific post from MongoDB
router.get("/posts/get/:post_id", async (req, res) => {
  res.json(await Post.find({ post_id: req.params.post_id }));
});

// Route to search for a post from MongoDB
router.get("/posts/search/:search_term", async (req, res) => {
  res.json(await Post.find({ post_title: { $regex: req.params.search_term, $options: "i" } }));
});

// Route to search for a post using a key value pair from MongoDB
router.get("/posts/search/:key/:value/:page", async (req, res) => {
  var query = {};
  query[req.params.key] = { $regex: req.params.value, $options: "i" };
  var posts = await Post.find(query).skip(req.params.page * page_offset).limit(page_offset);

  // get number of pages
  var num_posts = await Post.countDocuments(query);
  var num_pages = Math.ceil(num_posts / page_offset);

  res.json({
    num_pages: num_pages,
    posts: posts
  });
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
  post.post_content = req.body.post_content ?? post.post_content;

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

// Create a route to get comments by page offsets from MongoDB
router.get("/comments/:current_page", async (req, res) => {
  // get number of pages
  var num_comments = await Comment.countDocuments({});
  var num_pages = Math.ceil(num_comments / page_offset);

  var comments = await Comment.find({}).skip(req.params.current_page * page_offset).limit(page_offset);

  res.json({
    num_pages: num_pages,
    comments: comments
  });
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

// Route to search for a comment using a key value pair from MongoDB
router.get("/comments/search/:key/:value/:page", async (req, res) => {
  var query = {};
  query[req.params.key] = { $regex: req.params.value, $options: "i" };
  var comments = await Comment.find(query).skip(req.params.page * page_offset).limit(page_offset);

  // get number of pages
  var num_comments = await Comment.countDocuments(query);
  var num_pages = Math.ceil(num_comments / page_offset);

  res.json({
    num_pages: num_pages,
    comments: comments
  });
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

// // Server-side route for fetching top 3 subreddits based on post count
// app.get('/api/topSubreddits', (req, res) => {
//   const searchQuery = req.query.searchQuery.toLowerCase();
  
//   // Example: Fetch top 3 subreddits with most posts from your database
//   const topSubreddits = [
//     { name: 'r/funny', postCount: 1000 },
//     { name: 'r/AskReddit', postCount: 850 },
//     { name: 'r/science', postCount: 750 },
//     // ... Retrieve the subreddits from your database ...
//   ];

//   // Filter the subreddits based on the search query and sort by post count
//   const filteredSubreddits = topSubreddits.filter(subreddit =>
//     subreddit.name.toLowerCase().includes(searchQuery)
//   ).sort((a, b) => b.postCount - a.postCount);

//   // Send the top 3 subreddits as the API response
//   res.json({ subreddits: filteredSubreddits.slice(0, 3) });
// });

module.exports = router;

