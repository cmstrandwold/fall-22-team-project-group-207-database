const express = require("express");
const leaderModel = require('./model');
const app = express();

app.post("/add", async (request, response) => {
    const leader = new leaderModel(request.body) || new leaderModel({"name": "test request", "wins": 11});
  
    try {
      await leader.save();
      response.send(leader);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.get("/leaderboard", async (request, response) => {
    const leaders = await leaderModel.find();
  
    try {
      response.send(leaders);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  module.exports = app;