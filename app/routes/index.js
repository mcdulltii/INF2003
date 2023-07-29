const db = require("../app");
const express = require('express');
const mongoose = require("mongoose");
const crypto = require('crypto');

// ExpressJS routing
const router = express.Router();

// Models
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Subbludit = mongoose.model('Subbludit');

// Default variables
const page_offset = 10;

// Create a route to create a new user in SQL
router.post("/users/signup", async (req, res) => {
  const { username, password } = req.body;
  db.getConnection((err, conn) => {
    if (err) {
      console.log("Not connected due to error: " + err);
      res.status(401).json(err);
    } else {
      console.log("Connected! Connection id is " + conn.threadId);
      // Run the query
      conn.query("INSERT INTO users(user_id, user_name, user_password_hash, is_admin) VALUES (?, ?, ?, ?)", [crypto.randomUUID(), username, password, 0], (err, results) => {
        if (err) {
          console.log("Failed to insert into users table: " + err);
          res.status(401).json(err);
        } else {
          // Return the results
          res.status(200).json({ success: true });
        }
        conn.end();
      });
    }
  });
});

// Create a route to authenticate a user in SQL
router.post("/users/login", async (req, res) => {
  const { username, password } = req.body;
  console.log
  db.getConnection((err, conn) => {
    if (err) {
      console.log("Not connected due to error: " + err);
      res.status(401).json(err);
    } else {
      console.log("Connected! Connection id is " + conn.threadId);
      // Run the query
      conn.query("SELECT * FROM users WHERE user_name = ? AND user_password_hash = ?", [username, password], (err, results) => {
        if (err) {
          console.log("Failed to select from users table: " + err);
          res.status(401).json(err);
        } else {
          // Return the results
          if (results.length > 0) {
            // Login successful
            const user_id = results[0].user_id;
            res.status(200).json({ success: true, user_id: user_id.toString(), username: username});
          } else {
            // Login failed
            res.status(401).json({ error: 'Invalid username or password.' });
          }
        }
        conn.end();
      });
    }
  });
});

// Create a route to update a user in SQL
router.put("/users/update/:id", async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  db.getConnection((err, conn) => {
    if (err) {
      console.log("Not connected due to error: " + err);
      res.status(401).json(err);
    } else {
      console.log("Connected! Connection id is " + conn.threadId);
      // Run the query
      conn.query("UPDATE users SET user_name = ?, user_password_hash = ? WHERE user_id = ?", [username, password, id], (err, results) => {
        if (err) {
          console.log("Failed to update users table: " + err);
          res.status(401).json(err);
        } else {
          // Return the results
          res.status(200).json({ success: true });
        }
        conn.end();
      });
    }
  });
});


// Create a route to delete a user from SQL
router.delete("/users/delete/:id", async (req, res) => {
  const { id } = req.params;
  db.getConnection((err, conn) => {
    if (err) {
      console.log("Not connected due to error: " + err);
      res.status(401).json(err);
    } else {
      console.log("Connected! Connection id is " + conn.threadId);
      // Run the query
      conn.query("DELETE FROM users WHERE user_id =  ?", [id], (err, results) => {
        if (err) {
          console.log("Failed to delete from users table: " + err);
          res.status(401).json(err);
        } else {
          // Return the results
          res.status(200).json({ success: true });
        }
        conn.end();
      });
    }
  });
});

// Create a route to get user posts in SQL
router.post("/user/posts/:id", async (req, res) => {
  const { id } = req.params;
  console.log
  db.getConnection((err, conn) => {
    if (err) {
      console.log("Not connected due to error: " + err);
      res.status(401).json(err);
    } else {
      console.log("Connected! Connection id is " + conn.threadId);
      // Run the query
      conn.query("SELECT COUNT(*) AS num_posts FROM posts WHERE posts.user_id = ?", [id], (err, results) => {
        if (err) {
          console.log("Failed to select from posts table: " + err);
          res.status(401).json(err);
        } else {
          // Return the results
          res.status(200).json({ success: true, num_posts: parseInt(results[0].num_posts)});
        }
        conn.end();
      });
    }
  });
});

// Get all avail subreddits
router.post("/subreddit/get", async (req, res) => {
  db.getConnection((err, conn) => {
    if (err) {
      console.log("Not connected due to error: " + err);
      res.status(401).json(err);
    } else {
      console.log("Connected! Connection id is " + conn.threadId);
      // Run the query
      conn.query("SELECT forum_name FROM forums", (err, results) => {
        if (err) {
          console.log("Failed to select from posts table: " + err);
          res.status(401).json(err);
        } else {
          // Return the results
          res.status(200).json({ success: true, forums: results});
        }
        conn.end();
      });
    }
  });
});

// get subreddit by search term
router.get("/subreddit/search/:query", async (req, res) => {
  const { query } = req.params;

  db.getConnection((err, conn) => {
    if (err) {
      console.log("Not connected due to error: " + err);
      res.status(401).json(err);
    } else {
      console.log("Connected! Connection id is " + conn.threadId);
      // Run the query to search for subreddits based on the provided query
      const searchTerm = `%${query}%`; // Add wildcard to search for partial matches
      conn.query("SELECT forum_name FROM forums WHERE forum_name LIKE ?", [searchTerm], (err, results) => {
        if (err) {
          console.log("Failed to search subreddits: " + err);
          res.status(401).json(err);
        } else {
          // Return the results
          res.status(200).json({ success: true, subreddits: results });
        }
        conn.end();
      });
    }
  });
});

// Route to add a post to MongoDB
router.post("/posts/add", async (req, res) => {
  var post = new Post();
  // if post_id is not passed in, generate a random 7 length string
  post.post_id = req.body.post_id ?? Math.random().toString(36).substring(2, 9);
  post.post_title = req.body.post_title;
  post.subreddit = req.body.post_subreddit ?? "All"; // Forum Value
  post.post_url = req.body.post_url ?? "localhost:8000/#/indivpost/" + post.post_id; // POST ID
  post.flair_text = req.body.flair_text ?? "test";
  post.post_datetime = req.body.post_datetime ?? new Date().toISOString().slice(0, 19);
  post.post_content = req.body.post_content ?? "";
  var userID = req.body.post_user_id
  db.getConnection((err, conn) => {
    if (err) {
      console.log("Not connected due to error: " + err);
    } else {
      console.log("Connected! Connection id is " + conn.threadId);
      // Run the query

      conn.query("INSERT INTO posts (post_id, user_id, forum_id) values(?, ?, (SELECT forum_id From forums where forum_name = ?))", [post.post_id, userID, post.subreddit], (err, results) => {
        if (err) {
          console.log("Failed to insert posts table: " + err);
        } else {
        }
        conn.end();
      });
    }
  });
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

// posts per subreddit
router.get("/posts/sub/:current_page/:subreddit", async (req, res) => {
  const { current_page, subreddit } = req.params;

  // Get number of posts with the specific subreddit
  const num_posts = await Post.countDocuments({ subreddit });

  // Calculate the number of pages
  const num_pages = Math.ceil(num_posts / page_offset);

  // Retrieve posts for the specified subreddit, sorted by post_datetime in descending order,
  // paginated using the current_page and page_offset values
  const posts = await Post.find({ subreddit })
    .sort({ post_datetime: -1 })
    .skip(current_page * page_offset)
    .limit(page_offset);

  res.json({
    num_pages: num_pages,
    posts: posts,
  });
});

// Route to get a specific post from MongoDB
router.get("/posts/get/:post_id", async (req, res) => {
  res.json(await Post.find({ post_id: req.params.post_id }));
});

router.get("/posts/sorted-by-comments/:current_page", async (req, res) => {
  try {
    const currentPage = parseInt(req.params.current_page);
    const pageOffset = 10; // Assuming a fixed number of posts per page

    // Get the number of pages for comments and posts
    const numPosts = await Post.countDocuments({});
    const numPages = Math.ceil(numPosts / pageOffset);

    // Convert the current_page to the number of documents to skip
    const skipDocuments = (currentPage) * pageOffset;

    // Get all posts sorted by the number of comments using the aggregate framework
    const sortedPosts = await Post.aggregate([
      {
        $lookup: {
          from: "comments",
          localField: "post_id", // Use "post_id" instead of "_id"
          foreignField: "post_id",
          as: "comments",
        },
      },
      {
        $project: {
          _id: 1,
          post_id: 1,
          post_datetime: 1,
          post_title: 1,
          subreddit: 1,
          post_url: 1,
          flair_text: 1,
          post_content: 1,
          num_comments: { $size: "$comments" }, // Calculate the number of comments as the size of the comments array
        },
      },
      { $sort: { num_comments: -1 } }, // Sort by 'num_comments' in descending order (-1)
      { $skip: skipDocuments }, // Skip the appropriate number of posts based on the current page
      { $limit: pageOffset }, // Limit the number of posts per page
    ]);

    res.json({
      num_pages: numPages,
      posts: sortedPosts,
    });
  } catch (error) {
    console.error("Error retrieving sorted posts by comments:", error);
    res.status(500).json({ error: "Failed to retrieve sorted posts by comments" });
  }
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

// // Route to search for a subreddit from MongoDB
// router.get("/subbludit/search/:search_term", async (req, res) => {
//   res.json(await Subbludit.find({ name: { $regex: req.params.search_term, $options: "i" } }));
// });



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

