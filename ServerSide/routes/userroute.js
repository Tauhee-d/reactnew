const express = require("express");
const router = express.Router();
require("../db/connection");
const User = require("../models/usermodel");

router.get("/", (req, res) => {
  res.send("user");
});

router.post("/table", async (req, res) => {
  const { _id, email, name, deviceName, deviceId } = req.body;
  if (!_id || !email || !name || !deviceName || !deviceId) {
    return res.status(422).json({ error: "fields requitred" });
  }
  try {
    const emailExits = await User.findOne({ email: email });
    if (emailExits) {
     }
    const table = new User(req.body);
    const tableData = await table.save();
    if (tableData) {
      res.status(201).json({ message: "user detail upload successful" });
    } else {
      res.status(500).json({ error: "failed to upload" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/table", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

module.exports = router;
