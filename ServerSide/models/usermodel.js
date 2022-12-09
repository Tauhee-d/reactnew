const mongoose = require("mongoose");

const tableSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  deviceName: {
    type: String,
    required: true,
  },
  deviceId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("TABLE", tableSchema);
