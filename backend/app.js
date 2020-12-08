const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

require('dotenv').config();
if (process.env.NODE_ENV === 'development') {
 var cors = require('cors');
 app.use(cors());
}
app.use(express.json());

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://urjeet:urjeet@cluster0.n7krh.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;

connection.once('open', () => 
{
    console.log("MongoDB opened!");
});

let test = [1,2,3,4];
app.get('/',(req,res) =>{
    res.send(test)
});

const postsRouter = require('./routes/posts');
const subredditsRouter = require('./routes/subreddits');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');
const testRouter = require('./routes/tests');
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/tests',testRouter);
app.use('/comments',commentsRouter);
app.use('/subreddits',subredditsRouter);

app.listen(port, () => {
  console.log('Example app listening at http://localhost:3000');
});