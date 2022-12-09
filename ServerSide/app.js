const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);
require("dotenv/config");
require("./db/connection");
port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use(require("./routes/userroute"));

app.listen(port, () => console.log("server started ", port));
