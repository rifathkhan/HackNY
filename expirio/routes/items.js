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

// @route GET /
// @desc Show all items of a user 
router.route('/').get(auth.verifyToken, (req, res) => {

    jwt.verify(req.token, auth.secretKey, (err, authData) => {
        User.findById(authData.id)
        .then(user => {
            itemsRespond(res, user)
        })
        .catch(err => {
            res.status(404).json({error: err.toString(), success: false});
        });
    });
});

// @route POST create/
// @desc Create new item for a user
router.route('/create').post(auth.verifyToken, (req, res) => {

    jwt.verify(req.token, auth.secretKey, (err, authData) => {
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

// @route GET /
// @desc Update item for a user
router.route('/update').post(auth.verifyToken, (req, res) => {

    jwt.verify(req.token, auth.secretKey, (err, authData) => {
        User.findById(authData.id)
        .then(user => {
            user.items = user.items.map(elem => {
                if(req.body.id == elem._id){
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

// @route GET /
// @desc Delete item
router.route('/delete').delete(auth.verifyToken, (req, res) => {

    jwt.verify(req.token, auth.secretKey, (err, authData) => {
        User.findById(authData.id)
        .then(user => {
            user.items = user.items.filter(item => req.body.id != item._id);
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