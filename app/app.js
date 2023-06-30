const express = require("express");
const mariadb = require("mariadb");
const mongoose = require("mongoose");

const createError = require("http-errors");
const path = require("path");

const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// const pug = require('pug');

// const indexRouter = require("./routes/index");

// Models
require("./models/Post");
require("./models/Comment");

// ExpressJS App
const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

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

// Exposing creating new SQL connections
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

// gets routes to views
// app.use("/", indexRouter);

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

