const jwt  = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/user.model');
const auth = require('../services/authentication')

/*
    User API 

Todo: Finish the API for update and delete
*/

// Helper functions

function userSecureInfo(userData){
    return {
        username: userData.username,
        email: userData.email,
        cellnumber: userData.cellnumber
    }
}

// Routes

router.route('/signup').post((req, res) => {
    // Sign up

    newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        cellnumber: req.body.cellnumber,
        products: []
    });
    newUser.save()
    .then(userData => {
        jwt.sign({user: userData}, auth.secretKey, (err, token) => {
            if(err){
                return res.status(400).json({err, success: false});
            } 
            res.json({
                token,
                userData: userSecureInfo(userData), 
                success: true
            });
        });
    })
    .catch(err => {
        res.status(400).json({err, success: false});
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
            return res.status(400).json({message: "Not found!", success: false})
        }
        jwt.sign({user: userData}, auth.secretKey, (err, token) => {
            if(err){
                return res.status(400).json({err});
            } 
            return res.json({
                token, 
                userData:userSecureInfo(userData),
                success: true
            });
        });
    })
    .catch(err => {
        res.status(403).json({err, success: false});
    });
});

router.route('/update').post(auth.verifyToken, (req, res) => {
    // Update account

    jwt.verify(req.token, auth.secretKey, (err, authData) => {
        if(err) {
          return res.sendStatus(400).json({err, success: false});
        } 
        
        User.findById(authData.user._id)
        .then(user => {
            user.username = req.body.username;
            user.password = req.body.password;
            user.email = req.body.email;
            user.cellnumber = req.body.cellnumber;

            return user.save()

        })
        .then(userData => {
            jwt.sign({user: userData}, auth.secretKey, (err, token) => {
                if(err){
                    return res.status(400).json({err, success: false});
                } 
                res.json({
                    token,
                    userData: userSecureInfo(userData), 
                    success: true
                });
            });
        })
        .catch(err => {
            res.sendStatus(400).json({err, success: false});
        });
    });
});

router.route('/delete').delete(auth.verifyToken, (req, res) => {
    // Delete account
});

module.exports = router;
