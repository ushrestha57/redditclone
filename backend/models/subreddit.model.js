
const mongoose = require('mongoose');
const subredditSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    rules: [String],
    posts: [String],
    moderators: [String],
    subscriberCount: {type: Number, required : true, default: 0},


});


const Subreddit = mongoose.model('Subreddit', subredditSchema);
module.exports = Subreddit;