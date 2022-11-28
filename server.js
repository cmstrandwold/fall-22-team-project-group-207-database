const Router = require("./routes")
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var cors = require('cors')

app.use(cors())

const username = "cstrand";
const password = "9nDzeuX2jJpLr1is";
const cluster = "game-leaderboard";
const dbname = "leaderboard";
const uri = `mongodb+srv://${username}:${password}@${cluster}.me1bh2x.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const mongoose = require('mongoose');
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));

app.use(Router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});