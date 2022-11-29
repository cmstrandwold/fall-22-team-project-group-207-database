// const mongoose = require('mongoose');
// const schema = require('./schema');

// const model = mongoose.model('LeaderboardModel', schema);
// module.exports = model;

const mongoose = require("mongoose");

const LeaderSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  wins: {
    type: Number,
    default: 0,
  },
});

const LeaderModel = mongoose.model("Leader", LeaderSchema);

module.exports = LeaderModel;
