const express = require("express");
const mariadb = require("mariadb/callback");
const mongoose = require("mongoose");

const createError = require("http-errors");
const path = require("path");

const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const pug = require('pug');

// Models
require("./models/Post");
require("./models/Comment");
require("./models/Subbludit");

// ExpressJS App
const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");
// app.locals.basedir = path.join(__dirname, "views");

// Exposing creating new SQL connections
const pool = mariadb.createPool({
  host: "mariadb",
  user: "user",
  password: "password",
  database: "mysql_db",
  connectionLimit: 10,
});

module.exports = {
  getConnection: (callback) => {
    return pool.getConnection(callback);
  } 
}

// Create a new mongoose connection
mongoose.connect('mongodb://user:password@mongodb:27017/mongo_db');

// API Routings
var routes = require("./routes/index");
app.use("/", routes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(8000, () => {
  console.log("Express server listening on port 8000!");
});
