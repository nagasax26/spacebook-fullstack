var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/spacebookDB', function () {
  console.log("DB connection established!!!");
})

var Post = require('./models/postModel');

var postsRoute = require('./routes/posts');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
app.use('/posts', postsRoute);
// 2) to handle adding a post
// 3) to handle deleting a post
// 4) to handle adding a comment to a post
// 5) to handle deleting a comment from a post

app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});

/*==========================================
Fetch dummy data
==========================================*/
// Post.insertMany(
//   [
//     {text: "'It's elegant not just incredible!'", comments:
//     [
//       {text: "This concept has navigated right into my heart.", user:"sealcanape"},
//       {text: "Aquamarine. YEW!", user:"nodbrood"},
//     ]},
//     {text: "Let me take a nap... great camera angle, anyway.", comments:
//     [
//       {text: "Mission accomplished. It's magnificent, friend.", user:"betaunfriendly"},
//       {text: "Whoa.", user:"nodbrood"},
//     ]},
//     {text: "I admire your shot!!", comments:
//     [
//       {text: "This is strong work =)", user:"whippercopernicus"},
//       {text: "Looks graceful and minimal :)", user:"girltriton"},
//       {text: "I think I'm crying. It's that radiant.", user:"cornpork"},
//       {text: "Nice use of pink in this shot dude", user:"fertilebugs"},
//     ]},
//     {text: "Simple. So incredible.", comments:
//     [
//       {text: "Vastly amazing.", user:"vexingcrew"},
//       {text: "Exquisite dude I love the use of style and fold!", user:"girltriton"},
//       {text: "This colour palette blew my mind.", user:"betaunfriendly"},
//       {text: "I want to learn this kind of background image! Teach me.", user:"bagssignal"},
//       {text: "Revolutionary shot mate", user:"callforest"},
//       {text: "Exquisite work you have here.", user:"fertilebugs"},
//       {text: "My 61 year old son rates this shot very sleek!", user:"jossshield"},
//       {text: "Just appealing dude", user:"blythwidow"},
//       {text: "Such design, many iconography, so appealing", user:"atural"},
//     ]}
//   ],
//   function (err, posts) {
//     if (err) return console.log(err);

//     console.log(JSON.stringify(posts, null, 2));
//   })