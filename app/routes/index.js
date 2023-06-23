const getConnection = require("../app");
const express = require('express');
const mongoose = require("mongoose");

// ExpressJS routing
const router = express.Router();

// Models
var Post = mongoose.model('Post');

// Create a route to get all users from MySQL
router.get("/users", async (req, res) => {
  let conn;
  try {
    // Make a connection to MariaDB
    conn = await getConnection();

    // Run the query
    var rows = await conn.query("SELECT * FROM users");

    // Return the results
    res.send(rows);
  } catch (err) {
    res.send(err);
  } finally {
    if (conn) return conn.release();
  }
});

// Create a route to get all posts from MongoDB
router.get("/posts", (req, res, next) => {
  // Return the results
  Post.find().then((err, posts) => {
    if (err) {
      return next(err);
    }
    res.json(posts);
  });
});

module.exports = router;

