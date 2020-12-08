
const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    userID: {type: String},
    body: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now},
    upvotes: {type: Number, required : true, default: 0},
    comments: [String]
});

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;