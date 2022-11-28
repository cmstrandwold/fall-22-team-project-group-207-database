const express = require("express");
const leaderModel = require('./model');
const app = express();

app.post("/leaderboard/add", async (request, response) => {
    const leader = new leaderModel(request.body) || new leaderModel({"user_id": "ttt", "name": "test request", "wins": 11});
    try {
      await leader.save();
      leaderModel.updateOne(leader);
      response.send(leader);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.patch("/leaderboard/updateWins", async (request, response) => {  
    const leader = new leaderModel(request.body)
    try {
        await leader.save();
        const filter = { user_id: leader.id };
        const options = { upsert: false };
        const updateDoc = { wins: 999 };
        const result = await leaderModel.updateOne(filter, updateDoc, options).then(result => console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
          ));
        
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