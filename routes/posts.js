var express = require('express');
var Router = express.Router();

var Post = require('../models/postModel');

Router.get('/', function (req, res) {
    Post.find({}, function (err, posts) {
        if (err) throw err;
        res.send(posts);
    });
});

Router.post('/', function (req, res) {
    var postText = req.body.postText;
    var newPost = new Post({
        text: postText,
        comments: []
    });
    newPost.save(function (err, post) {
        if (err) throw err;
        res.send(post);
    });
});

Router.delete('/:id', function (req, res) {
    var id = req.params.id;
    Post.remove({
        _id: id
    }, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

Router.put('/:postId/edit', function(req, res){
    var postId = req.params.postId;
    Post.findOne({_id: postId}, function(err, post){
        post.text = req.body.postText;
        post.save(function(err, post){
            if(err) throw err;
            res.send(post);
        });
    });
});

Router.post('/:postId/comments', function (req, res) {
    var postId = req.params.postId;
    Post.findOne({
        _id: postId
    }).exec().then(function (post) {
        //we cant push to array and then save because the $pushAll is depcreat in mongoose > v4.x
        //so we use concat
        post.comments = post.comments.concat(req.body); 
        post.save(function (err, post) {
            res.send(post);
        });
    }).catch(function (err) {
        throw err;
    });
});

Router.delete('/:postId/comments/:commentId', function (req, res) {
    var postId = req.params.postId;
    var commentId = req.params.commentId;
    Post.update({
        _id: postId
    }, {
        $pull: {
            comments: {
                _id: commentId
            }
        }
    }, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

Router.put('/:postId/comments/:commentId/edit', function (req, res) {
    var postId = req.params.postId;
    var commentId = req.params.commentId;
    Post.update({ _id: postId, "comments._id":commentId},{ "comments.$.text":req.body.text }
    , function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = Router;