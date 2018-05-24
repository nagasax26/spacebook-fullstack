var express = require('express');
var Router = express.Router();

var Post = require('../models/postModel');

Router.get('/', function(req, res){
    Post.find({}, function(err, posts){
        if(err) throw err;
        res.send(posts);
    });
});

module.exports = Router;