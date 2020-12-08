

const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    userID: {type: String},
    title: {type: String, required: true},
    body: {type: String, required: false},
    date: {type: Date, required: true, default: Date.now},
    upvotes: {type: Number, required : true, default: 0},
    comments: [String],
    subreddit: {type:String, required: false}
});


const Post = mongoose.model('Post', postSchema);
module.exports = Post;