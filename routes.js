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

app.patch("/leaderboard/update/{userid}", async (request, response) => {  
  const leader = new leaderModel(request.body)
  try {
      await leader.save();
      const filter = { user_id: leader.user_id };
      const options = { upsert: false };
      const updateDoc = { wins: leader.wins };
      console.log('filtering')
      console.log(await leaderModel.filter(filter));
      const result = await leaderModel.updateOne(filter, updateDoc, options).then(result => console.log(
          `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
        ));
        console.log(result);
      response.send(leader);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.patch("/leaderboard/win/{userid}", async (request, response) => {  
    const leader_id = await request.params['userid']
    try {
        await leader_id.save();
        const leader = leaderModel.find({user_id: leader_id})
        await leader.save();
        const filter = { user_id: leader_id };
        const options = { upsert: false };
        const newWins = leader.wins + 1;
        const updateDoc = { wins: newWins };
        console.log('filtering')
        console.log(await leaderModel.filter(filter));
        const result = await leaderModel.updateOne(filter, updateDoc, options).then(result => console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
          ));
          console.log(result);
        await result.save();
        response.send(result);
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