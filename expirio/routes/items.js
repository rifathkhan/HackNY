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
function itemsRespond(res, user){
    splitItemsArrs = splitExpr(user.items);
    exprItems = splitItemsArrs[0];
    goodItems = splitItemsArrs[1];
    return res.json({goodItems, exprItems, allItems: user.items, success: true});
}

//--------------------------------------------------------------------------
// Routes
//--------------------------------------------------------------------------

// @route GET items
// @headers {
//     Authorization: { Type: String, Value: "bearer " + <Token string> }
// }
// @desc Show all items of a user 
router.route('/').get(auth.verifyToken, (req, res) => {

    jwt.verify(req.token, auth.secretKey, (err, authData) => {
        if(err) {
            return res.status(401).json({error: err.toString(), success: false});
        } 
        User.findById(authData.id)
        .then(user => {
            itemsRespond(res, user)
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
                    "expireDate": req.body.expireDate
                })
            );
            return user.save();
        })
        .then(user => {
            itemsRespond(res, user)
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
                    return elem;
                }
                return elem;
            });
            return user.save()
        })
        .then(user => {
            itemsRespond(res, user)
        })
        .catch(err => {
            res.status(401).json({error: err.toString(), success: false});
        });
        
    });
});

// @route DELETE items/delete/:id
// @headers {
//     Authorization: {Type: String, Value: "bearer " + <Token string>}
// }Post
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
            itemsRespond(res, user)
        })
        .catch(err => {
            res.status(401).json({error: err.toString(), success: false});
        });
        
    });
});

module.exports = router;