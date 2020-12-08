const router = require('express').Router();
let Post = require('../models/post.model.js');
let Comment = require('../models/comment.model.js');
let User = require('../models/user.model.js');
router.route('/').get((req,res) =>
{
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json("Error " + err));
});
router.route('/:id').get((req,res) =>
{
    Post.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json("Error " + err));
});
router.route('/:id').delete((req,res) =>
{
    Post.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post deleted.'))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route('/upvotepost/:id').post((req,res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.upvotes = post.upvotes +1;
            post.save()
                .then(() => res.json('Post upvoted!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

});
router.route('/addcomment/:postid/').post((req,res) => {
    var newComment = new Comment(req.body);
    var userid = req.body.
    newComment.save()
        .catch(err => res.status(400).json('Error: ' + err));
    identification = newComment.id
    Post.findById(req.params.postid)
        .then(post => {
            post.comments.push(identification);
            post.save()
                .then(() => res.json('Comment added to post!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    User.findById(req.params.userid)
        .then(user => {
            user.comments.push(identification);
            user.save()
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    

});
module.exports = router;