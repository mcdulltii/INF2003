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

// Create a route to get all posts from MongoDB
router.get("/posts/get", async (req, res) => {
  res.json(await Post.find({}));
});

// Create a route to get all comments from MongoDB
router.get("/comments/get", async (req, res) => {
  res.json(await Comment.find({}));
});

module.exports = router;

