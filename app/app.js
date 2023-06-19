const express = require("express");
const mariadb = require("mariadb");
const MongoClient = require('mongodb').MongoClient;

const createError = require("http-errors");
const path = require("path");

const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// const pug = require('pug');

// const indexRouter = require("./routes/index");

const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});


// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");
// app.locals.basedir = path.join(__dirname, "views");

// Connect to mariadb
const pool = mariadb.createPool({
  host: "mariadb",
  user: "user",
  password: "password",
  database: "mysql_db",
});

// Exposing the ability to creating new connections
module.exports={
    getConnection: function(){
      return new Promise(function(resolve,reject){
        pool.getConnection().then(function(connection){
          resolve(connection);
        }).catch(function(error){
          reject(error);
        });
      });
    }
  }

// Create a new MongoClient connection
const uri = 'mongodb://user:password@mongodb:27017/mongo_db';
const client = new MongoClient(uri);

// gets routes to views
// app.use("/", indexRouter);

// Create a route to get all users from MySQL
app.get("/users", async (req, res) => {
  let conn;
  try {
    // Make a connection to MariaDB
    conn = await pool.getConnection();

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
app.get("/posts", async (req, res) => {
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Run the query
    var postsList = await client.db("mongo_db").collections("post").find();

    // Return the results
    postsList.toArray((err, posts) => {
      if (err) {
        res.send(err);
      } else {
        res.send(posts);
      }
    });
  } catch (err) {
      res.send(err);
  } finally {
      await client.close();
  }
});

app.listen(8000, () => {
  console.log("Express server listening on port 8000!");
});

