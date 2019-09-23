const jwt  = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/user.model');
const auth = require('../services/authentication')

/*
Todo: finish the crud for items.
Please include authentication.
This api is only for privilaged users (anyone who is logged in)
*/

router.route('/').get((req, res) => {
    //Show all items of a user
});

router.route('/create').post((req, res) => {
    //Create new item for a user
});

router.route('/update').delete((req, res) => {
    //Update item for a user
});

router.route('/delete').delete((req, res) => {
    // Delete item
});

module.exports = router;