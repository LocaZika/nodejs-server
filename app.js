var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
const usersRouter = require("./routes/usersRoute");
const productRouter = require("./routes/productsRoute");
const authRouter = require("./routes/authRoute");

const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(
      "mongodb+srv://locazika:gB5FqmJpR04d6Ubf@cluster0.oiu35c5.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connect successfully"))
    .catch((err) => console.log("connect failed. Error: ", err));
};

connectDb();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Declera router

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productRouter);
// app.use("/auth", authRouter);

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

module.exports = app;
