const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: String,
    wins: Number,
  }
);
module.exports = schema;
