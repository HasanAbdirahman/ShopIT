const app = require("./app");

// setting up config path
require("dotenv").config();

// connect to the db
require("./config/database");

// handles uncaught exceptions eg console.log(a) where a is not defined
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to uncaughtException");
  process.exit(1);
});

const server = app.listen(process.env.PORT, () => {
  console.log("Server is listening on port " + process.env.PORT);
});

// this helps us close the connection if the connection is wrong
// handles unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log(`Shutting down  the server due to unhandled Promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
