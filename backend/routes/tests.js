const router = require('express').Router();
let Test = require('../models/test.model.js');

router.route('/').get((req,res) =>
{
    Test.find()
        .then(tests => res.json(tests))
        .catch(err => res.status(400).json("Error " + err));
});


router.route('/add').post((req,res) =>
{
    const num = req.body.num;

    const newTest = new Test({num});

    newTest.save()
        .then(() => res.json('Test added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
    

module.exports = router;