const mongoose = require("mongoose");

mongoose.connect(process.env.CLOUD_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});
