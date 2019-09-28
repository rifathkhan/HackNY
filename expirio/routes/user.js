const jwt  = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/user.models').User;
const auth = require('../services/authentication')

//  User API 

/*

TODO:

Fix delete API to require password

If password encryption is added, reconfigure the APIs if password is needed

*/

//----------------------------------------------------------------------------------------
// Helper functions
//----------------------------------------------------------------------------------------


function userSecureInfo(userData){
    return {
        username: userData.username,
        email: userData.email,
        cellnumber: userData.cellnumber
    }
}

function sendTokenInfo(res, userData){
    jwt.sign({id: userData._id}, auth.secretKey, {expiresIn: '1d'}, (err, token) => {
        if(err){
            res.status(401).json({error: err.toString(), success: false});
        } 
        res.json({token, userInfo: userSecureInfo(userData), success: true});
    });
}

//----------------------------------------------------------------------------------------
// Routes
//----------------------------------------------------------------------------------------

// @route POST user/signup
// @body {
//     username: {Type: String},
//     password: {Type: String},
//     email: {Type: String},
//     cellnumber: {Type: String}
// }
// @desc Signs up user to db and sends token
router.route('/signup').post((req, res) => {

    newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        cellnumber: req.body.cellnumber,
        items: []
    });

    const reg = new RegExp('^\\d+$');

    if(!reg.test(req.body.cellnumber)){
        return res.status(400).json({error: "numbers only allowed!", success: false});
    }

    newUser.save()
    .then(userData => {
        sendTokenInfo(res, userData);
    })
    .catch(err => {
        res.status(401).json({error: err.toString(), success: false});
    });
});

// @route GET user/login
// @body {
//     username: {Type: String},
//     password: {Type: String},
// }
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

// @route PATCH user/update
// @headers {
//     Authorization: { Type: String, Value: "bearer " + <Token string> }
// }
// @body {
//     username: {Type: String},
//     email: {Type: String},
//     cellnumber: {Type: String}
// }
// @desc Update user info (except password)
router.route('/update').patch(auth.verifyToken, (req, res) => {

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

// @route PATCH user/update/password
// @headers {
//     Authorization: { Type: String, Value: "bearer " + <Token string> }
// }
// @body {
//     oldPassword: {Type: String},
//     newPassword: {Type: String},
// }
// @desc Updates user password
router.route('/update/password').patch(auth.verifyToken, (req, res) => {

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

// @route DELETE user/delete
// @headers {
//     Authorization: { Type: String, Value: "bearer " + <Token string> }
// }
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
