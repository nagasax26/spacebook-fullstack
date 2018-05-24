var express = require('express');
var Router = express.Router();

var Post = require('../models/postModel');

Router.get('/', function(req, res){
    Post.find({}, function(err, posts){
        if(err) throw err;
        res.send(posts);
    });
});

Router.post('/', function(req, res){
    var postText = req.body.postText;
    var newPost = new Post({text: postText, comments:[]});
    newPost.save(function(err, post){
        if(err) throw err;
        res.send(post);
    });
});

Router.delete('/:id', function(req, res){
    var id = req.params.id;
    Post.remove({_id: id}, function(err, result){
        if(err) throw err;
        res.send(result);
    });
});

module.exports = Router;