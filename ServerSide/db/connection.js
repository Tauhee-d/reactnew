const mongoose = require("mongoose");
const dotenv = require("dotenv");

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("db connected");
    else console.log("db  error");
  }
);
