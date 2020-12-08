
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique : true,
        trim: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        unique : false,
        trim : true,
        minLength : 6,
    },
    email: {
        type: String,
        required : true,
        unique : true,
        trim : true,
    },
    posts: 
    {
        type: [String]
    },
    comments: 
    {
        type: [String]
    },
    subreddits:
    {
        type: [String]
    }
});

const User = mongoose.model('User',userSchema);
module.exports = User;