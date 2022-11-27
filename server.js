const Router = require("./routes")
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const username = "cstrand";
const password = "9nDzeuX2jJpLr1is";
const cluster = "game-leaderboard";
const dbname = "leaderboard";
const collection = "leaderboard"
const uri = `mongodb+srv://${username}:${password}@${cluster}.me1bh2x.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const mongoose = require('mongoose');
console.log(uri)
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
db.once("open", function () {
  console.log("Connected successfully");
});



console.log('point 1')

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });

// app.get('/', (req, res, next) => {

//     res.status(200).json({
//         status: 'success',
//         data: {
//             name: 'group-207-fp-db',
//             version: '0.1.0',
//             collections: 'hi'
//         }
//     });

// });

// require('./db/leaderboard/service')(app);

console.log('point 2')

app.use(Router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

console.log('point 3')


// const { MongoClient } = require("mongodb");
// // Replace the uri string with your connection string.
// const uri =
// "mongodb+srv://cstrand:9nDzeuX2jJpLr1is@game-leaderboard.me1bh2x.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri);

// async function run() {
  
//   try {
//     const database = client.db('leaderboard');
//   const leaderboard = database.collection('leaderboard');
//     // Query for a movie that has the title 'Back to the Future'
//     //const query = { title: 'Back to the Future' };
//     const movie = await leaderboard.find().toArray();
//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// app.get('/leader', (req, res, next) => {
//   const database = client.db('leaderboard');
//   const leaderboard = database.collection('leaderboard');
//       res.status(200).json(leaderboard.find().toArray());
// })


// run().catch(console.dir);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });


// const express = require("express");
// const app = express();
 
// //middleware
// app.use(express.json());

// const mongoose = require("mongoose");
// //configure mongoose
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/CRUD",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Connected to MongoDB");
//     }
//   }
// );
 
// app.listen(3001, () => {
//   console.log("Server is running on port 3001");
// });

// module.exports = app;