
const uri = "mongodb+srv://cstrand:9nDzeuX2jJpLr1is@game-leaderboard.me1bh2x.mongodb.net";

const mongoose = require('mongoose');
console.log(uri)
mongoose.connect(uri);

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log('point 1')

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

console.log('point 2')

app.listen(process.env.PORT || 4000);

console.log('point 3')

