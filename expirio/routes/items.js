const jwt  = require('jsonwebtoken');
const router = require('express').Router();
const {User, Item} = require('../models/user.models');
const auth = require('../services/authentication');
const mongoose = require('mongoose');
const splitExpr = require('../services/itemservices').splitExpr

// Items API

//--------------------------------------------------------------------------
// Helper functions
//--------------------------------------------------------------------------

// @desc Responds to client with items array and a split up version
function splitItemsRespond(res, user){
    splitItemsArrs = splitExpr(user.items);
    exprItems = splitItemsArrs[0];
    goodItems = splitItemsArrs[1];
    return res.json({goodItems, exprItems, success: true});
}

//--------------------------------------------------------------------------
// Routes
//--------------------------------------------------------------------------

// @route GET items
// @headers {
//     Authorization: { Type: String, Value: "bearer " + <Token string> }
// }
// @query { split: {Type: String} } 
//      
//      if split = "true", then two arrays split by expired and not expired is 
//      is given in the response.
// 
// @desc Show all items of a user 
router.route('/').get(auth.verifyToken, (req, res) => {

    jwt.verify(req.token, auth.secretKey, (err, authData) => {
        if(err) {
            return res.status(401).json({error: err.toString(), success: false});
        } 
        User.findById(authData.id)
        .then(user => {
            if (req.query.split == 'true'){
                return splitItemsRespond(res, user);
            }
            res.json({items: user.items, success: true});
        })
        .catch(err => {
            res.status(404).json({error: err.toString(), success: false});
        });
    });
});

// @route POST items/create
// @headers {
//     Authorization: { Type: String, Value: "bearer " + <Token string> }
// }
// @query { split: {Type: String} } 
//      
//      if split = "true", then two arrays split by expired and not expired is 
//      is given in the response.
// 
// @body {
//     name: {Type: String},
//     type: {Type: String},
//     expireDate: {Type: Date}
// }
// @desc Create new item for a user
router.route('/create').post(auth.verifyToken, (req, res) => {

    jwt.verify(req.token, auth.secretKey, (err, authData) => {
        if(err) {
            return res.status(401).json({error: err.toString(), success: false});
        } 
        User.findById(authData.id)
        .then(user => {
            user.items.push(
                new Item({
                    "_id": mongoose.Types.ObjectId(),
                    "name": req.body.name,
                    "type": req.body.type,
                    "expireDate": req.body.expireDate,
                    "description": req.body.description,
                    "duration": req.body.duration
                })
            );
            return user.save();
        })
        .then(user => {
            if (req.query.split == 'true'){
                return splitItemsRespond(res, user);
            }
            res.json({items: user.items, success: true});
        })
        .catch(err => {
            res.status(400).json({error: err.toString(), success: false});
        });
        
    });
});

// @route PATCH items/update/:id
// @headers {
//     Authorization: { Type: String, Value: "bearer " + <Token string> }
// }
// @params { id: {Type: String} }
// @query { split: {Type: String} } 
//      
//      if split = "true", then two arrays split by expired and not expired is 
//      is given in the response.
// 
// @body {
//     name: {Type: String},
//     type: {Type: String},
//     expireDate: {Type: Date}
// }
// @desc Update item for a user
router.route('/update/:id').patch(auth.verifyToken, (req, res) => {

    jwt.verify(req.token, auth.secretKey, (err, authData) => {
        if(err) {
            return res.status(401).json({error: err.toString(), success: false});
        } 
        User.findById(authData.id)
        .then(user => {
            user.items = user.items.map(elem => {
                if(req.params.id == elem._id){
                    elem.name = req.body.name;
                    elem.type = req.body.type;
                    elem.expireDate = req.body.expireDate;
                    elem.description = req.body.description;
                    elem.duration = req.body.duration;
                }
                return elem;
            });
            return user.save()
        })
        .then(user => {
            if (req.query.split == 'true'){
                return splitItemsRespond(res, user);
            }
            res.json({items: user.items, success: true});
        })
        .catch(err => {
            res.status(400).json({error: err.toString(), success: false});
        });
        
    });
});

// @route DELETE items/delete/:id
// @headers {
//     Authorization: {Type: String, Value: "bearer " + <Token string>}
// }
// @query { split: {Type: String} } 
//      
//      if split = "true", then two arrays split by expired and not expired is 
//      is given in the response.
// 
// @desc Delete item
router.route('/delete/:id').delete(auth.verifyToken, (req, res) => {

    jwt.verify(req.token, auth.secretKey, (err, authData) => {
        if(err) {
            return res.status(401).json({error: err.toString(), success: false});
        } 
        User.findById(authData.id)
        .then(user => {
            user.items = user.items.filter(item => req.params.id != item._id);
            user.save();
            return user;
        })
        .then(user => {
            if (req.query.split == 'true'){
                return splitItemsRespond(res, user);
            }
            res.json({items: user.items, success: true});
        })
        .catch(err => {
            res.status(400).json({error: err.toString(), success: false});
        });
        
    });
});

module.exports = router;