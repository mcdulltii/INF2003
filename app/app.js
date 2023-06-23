const express = require("express");
const mariadb = require("mariadb");
const mongoose = require("mongoose");

// Models
require("./models/Post");

// ExpressJS App
const app = express();

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

