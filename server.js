
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://cstrand:9nDzeuX2jJpLr1is@game-leaderboard.me1bh2x.mongodb.net";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
 // perform actions on the collection object
  client.close();
});

const mongoose = require('mongoose');
mongoose.connect(uri);

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.get('/', (req, res, next) => {

    res.status(200).json({
        status: 'success',
        data: {
            name: 'name of your app',
            version: '0.1.0'
        }
    });

});

require('./db/leaderboard/service')(app);

app.listen(process.env.PORT || 4000);

