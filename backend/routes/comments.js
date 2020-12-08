const router = require('express').Router();
let Post = require('../models/post.model.js');
let Comment = require('../models/comment.model.js');
let User = require('../models/user.model.js');
router.route('/').get((req,res) =>
{
    Comment.find()
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json("Error " + err));
});
router.route('/:id').get((req,res) =>
{
    Comment.findById(req.params.id)
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json("Error " + err));
});

router.route('/:id').delete((req,res) =>
{
    Comment.findByIdAndDelete(req.params.id)
    .then(() => res.json('Comment deleted.'))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route('/upvotecomment/:id').post((req,res) => {
    Comment.findById(req.params.id)
        .then(comment => {
            comment.upvotes = comment.upvotes +1;
            comment.save()
                .then(() => res.json('Comment upvoted!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

});
router.route('/downvotecomment/:id').post((req,res) => {
    Comment.findById(req.params.id)
        .then(comment => {
            comment.upvotes = comment.upvotes -1;
            comment.save()
                .then(() => res.json('Comment upvoted!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

});
router.route('/addcomment/:commentid/').post((req,res) => {
    var newComment = new Comment(req.body);
    newComment.save()
        .catch(err => res.status(400).json('Error: ' + err));
    identification = newComment.id
    Comment.findById(req.params.commentid)
        .then(comment => {
            comment.comments.push(identification);
            comment.save()
                .then(() => res.json('Comment added to comment!')) //only one res.jsons per response
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    User.findById(req.body.userID)
        .then(user => {
            user.comments.push(identification);
            user.save()
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

});
module.exports = router;