require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var v1Router = require("./routes/v1/v1Router");
const v2Router = require("./routes/v2/v2Router");
const { default: mongoose } = require("mongoose");
const { HOST, DATABASE } = require("./util/config");
const passport = require("passport");
const helmet = require("helmet");
var app = express();
//const sequelize = require("./util/database");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(helmet());
require("./util/passport");

app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoose
  .connect(`mongodb://${HOST}:27017/${DATABASE}`)
  .then((result) => {
    console.log("Mongodb connected");
  })
  .catch((error) => {
    console.log("Mongodb error", error);
  });

// sequelize.sync().then((result)=>{
//   //console.log(result);
// }).catch((error)=>{
//   console.log(error);
// });

module.exports = app;
