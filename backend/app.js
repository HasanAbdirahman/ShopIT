const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
app.use(express.json());
app.use(cookieParser());
mongoose.set("strictQuery", true);
const errorMiddleware = require("./utils/errorHandler");
// import all routes
const products = require("./routes/products");
const users = require("./routes/users");

app.use("/api/products", products);
app.use("/api/users", users);

// mounting the errorMiddleware handler
app.use(errorMiddleware);

module.exports = app;
