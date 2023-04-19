const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const errorMiddleware = require("./middlewares/errors");
const fileUpload = require("express-fileupload");
mongoose.set("strictQuery", true);

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// import all routes
const products = require("./routes/products");
const users = require("./routes/users");
const orders = require("./routes/orders");
const payment = require("./routes/payment");

app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/order", orders);
app.use("/api/v1", payment);

// mounting the errorMiddleware handler
app.use(errorMiddleware);

module.exports = app;
