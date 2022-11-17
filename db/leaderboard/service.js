const dao = require('./dao')

module.exports = (app) => {

  console.log('dao')
  
  const findLeaderboard = (req, res) =>
    dao.findLeaderboard()
      .then(leaderboard => res.json(leaderboard));

  app.get("/rest/leaderboard", findLeaderboard);

}




