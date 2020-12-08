const router = require('express').Router();
let Post = require('../models/post.model.js');
let Subreddit = require('../models/subreddit.model.js');
let User = require('../models/user.model.js');
 //get all, no parameters
router.route('/').get((req,res) =>
{
    Subreddit.find()
        .then(subreddits => res.json(subreddits))
        .catch(err => res.status(400).json("Error " + err));
});
//get, takes in subredditID as parameter
router.route('/:id').get((req,res) => 
{
    Subreddit.findById(req.params.id)
        .then(subreddits => res.json(subreddits))
        .catch(err => res.status(400).json("Error " + err));
});
 //subscribe, takes in subredditID and userID as parameters
router.route('/subscribe/:subredditID/:userID').post((req,res) => { 
    Post.findById(req.params.subredditID)
        .then(post => {
            post.subscriberCount = post.subscriberCount +1;
            post.save()
                .then(() => res.json('Subreddit subscribed!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    User.findById(userID)
        .then(user => {
            user.subreddits.push(subredditID);
            user.save()
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

});
//add subreddit, no parameters
router.route('/add/').post((req,res) => 
{
    var newSubreddit = new Subreddit(req.body);
    newSubreddit.save()
        .then(() => res.json('Subreddit added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    
});
//add moderator, subredditID and userID of new moderator as parameter
router.route('/addmod/:subredditID/:userID').post((req,res) => 
{
    Subreddit.findById(req.params.subredditID)
        .then(subreddit => {
            subreddit.moderators.push(req.params.userID);
            subreddit.save()
                .then(() => res.json('Moderator added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));   
});
//delete subreddit, takes in subredditID as parameter
router.route('/:id').delete((req,res) => 
{
    Subreddit.findByIdAndDelete(req.params.id)
        .then(() => res.json('Subreddit deleted.'))
        .catch(err => res.status(400).json("Error: " + err));
});
//creates new post and adds it to a subreddit, subreddit ID as parameter
router.route('/addpost/:subredditID').post((req,res) =>
{
    var newPost = new Post(req.body);
    var userID = req.body.userID;

    newPost.save()
        .catch(err => res.status(400).json('Error: ' + err));
    User.findById(userID)
        .then(user => {
            user.posts.push(newPost._id);
            user.save()
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    Subreddit.findById(req.params.subredditID)
        .then(subreddit => {
            subreddit.posts.push(newPost._id);
            subreddit.save()
                .then(() => res.json('Post added to subreddit!'))
                .catch(err => res.status(400).json('Error: ' + err));
        });
    
});
module.exports = router;