const jwt  = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/user.model');
const auth = require('../services/authentication')

//  User API 

/*
* Todo:
* Create Delete and Signout api
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

function sendToken(userData){
    jwt.sign({id: userData._id}, auth.secretKey, (err, token) => {
        if(err){
            return res.status(400).json({
                err, 
                success: false
            });
        } 
        return res.json({
            token,
            userData: userSecureInfo(userData), 
            success: true
        });
    });
}

//----------------------------------------------------------------------------------------
// Routes
//----------------------------------------------------------------------------------------

router.route('/signup').post((req, res) => {
    // Sign up

    newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        cellnumber: req.body.cellnumber,
        items: []
    });
    newUser.save()
    .then(userData => {
        return sendToken(userData)
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
        return sendToken(userData)
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
        
        User.findById(authData.id)
        .then(user => {
            user.username = req.body.username;
            user.password = req.body.password;
            user.email = req.body.email;
            user.cellnumber = req.body.cellnumber;

            return user.save()

        })
        .then(userData => {
            return sendToken(userData)
        })
        .catch(err => {
            res.sendStatus(400).json({err, success: false});
        });
    });
});

router.route('/signout').get(auth.verifyToken, (req, res) => {
    // Sign outs account
});

router.route('/delete').delete(auth.verifyToken, (req, res) => {
    // Delete account
});

module.exports = router;
