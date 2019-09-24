const jwt  = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/user.model');
const auth = require('../services/authentication')

//  User API 

/*
* Todo:
* Create Delete api.
*/

//----------------------------------------------------------------------------------------
// Helper functions
//----------------------------------------------------------------------------------------


function userSecureInfo(userData){
    return {
        username: userData.username,
        email: userData.email,
        cellnumber: userData.cellnumber,
        items: userData.items
    }
}

function sendTokenInfo(res, userData){
    jwt.sign({id: userData._id}, auth.secretKey, {expiresIn: '1d'}, (err, token) => {
        if(err){
            res.status(401).json({error: err.toString(), success: false});
        } 
        res.json({token,userInfo: userSecureInfo(userData), success: true});
    });
}

//----------------------------------------------------------------------------------------
// Routes
//----------------------------------------------------------------------------------------

// @route POST /signup
// @desc Signs up user to db and sends token
router.route('/signup').post((req, res) => {

    newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        cellnumber: req.body.cellnumber,
        items: []
    });
    newUser.save()
    .then(userData => {
        sendTokenInfo(res, userData);
    })
    .catch(err => {
        res.status(401).json({error: err.toString(), success: false});
    });
});

// @route GET /login
// @desc Logs in user and sends token
router.route('/login').get((req, res) => {
    
    // For simplicity sake we only assume username and password in res.body
    userInfo = {
        username: req.body.username,
        password: req.body.password
    };
    User.findOne(userInfo)
    .then(userData => {
        if(!userData){
            return res.status(401).json({message: "Not found!", success: false});
        }
        sendTokenInfo(res, userData);
    })
    .catch(err => {
        res.status(403).json({error: err.toString(), success: false});
    });
});

// @route POST /login
// @desc Update user info (except password)
router.route('/update').post(auth.verifyToken, (req, res) => {

    jwt.verify(req.token, auth.secretKey, (err, authData) => {
        if(err) {
          return res.status(401).json({error: err.toString(), success: false});
        } 
        User.findById(authData.id)
        .then(user => {
            user.username = req.body.username;
            user.email = req.body.email;
            user.cellnumber = req.body.cellnumber;

            return user.save();

        })
        .then(userData => {
            res.json({userInfo: userSecureInfo(userData), success: true});
        })
        .catch(err => {
            res.status(401).json({error: err.toString(), success: false});
        });
    });
});

// @route POST /login
// @desc Updates user password
router.route('/update/password').post(auth.verifyToken, (req, res) => {

    jwt.verify(req.token, auth.secretKey, (err, authData) => {
        if(err) {
          return res.status(401).json({error: err.toString(), success: false});
        } 
        User.findById(authData.id)
        .then(user => {
            if(user.password !== req.body.oldPassword){
                throw new Error('old password invalid');
            }
            user.password = req.body.newPassword;
            return user.save();
        })
        .then(userData => {
            res.json({userInfo: userSecureInfo(userData), success: true});
        })
        .catch(err => {
            res.status(401).json({error: err.toString(), success: false});
        });
    });
});

// @route DELETE /login
// @desc Deletes current user (will not affect token on client side but will become invalid). 
//       The client server still is responsible for removing the token
router.route('/delete').delete(auth.verifyToken, (req, res) => {

    jwt.verify(req.token, auth.secretKey, (err, authData) => {
        if(err) {
            return res.status(401).json({error: err.toString(), success: false});
        } 
        User.findByIdAndRemove(authData.id, (err, doc) => {
            if(err){
                return res.status(403).json({error: err.toString(), success: false});
            }
            console.log(doc);
            res.json({message: "successfuly removed", success: true});
        });
    });
});

module.exports = router;
