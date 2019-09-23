const jwt  = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/user.model');
const auth = require('../services/authentication')

/*
    User API 

Todo: Finish the API for update and delete
*/

router.route('/signup').post((req, res) => {
    // Sign up

    newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.password,
        cellnumber: req.body.password,
        products: []
    });
    newUser.save()
    .then(userData => {
        jwt.sign({user: userData}, auth.secretKey, (err, token) => {
            if(err){
                return res.status(403).json({err});
            } 
            res.json({token});
        });
    })
    .catch(err => {
        res.status(403).json({err});
    });
});

router.route('/login').get((req, res) => {
    // Login
    
    // For simplicity sake we only assume username and password in res.body
    userInfo = {
        username: req.body.username,
        password: req.body.password
    };
    //make querie if mongodb user has username and password match
    User.findOne(userInfo)
    .then(userData => {
        if(!userData){
            return res.status(404).json({message: "Not found!"})
        }
        jwt.sign({user: userData}, auth.secretKey, (err, token) => {
            if(err){
                return res.status(403).json({err});
            } 
            res.json({token});
        });
    })
    .catch(err => {
        res.status(403).json({err});
    });
});

router.route('/update').post((req, res) => {
    // Update account
});

router.route('/delete').delete((req, res) => {
    // Delete account
});

module.exports = router;
