const router = require('express').Router();
let User = require('../models/user.model.js');

router.route('/').get((req,res) =>
{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error " + err));
});
router.route('/:id').get((req,res) =>
{
    
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error " + err));
});

router.route('/add').post((req,res) =>
{
    var newUser = new User(req.body);

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;