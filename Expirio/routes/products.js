const jwt  = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/user.model');
const auth = require('../services/authentication')

/*
Todo: finish the crud for products.
Please include authentication.
This api is only for privilaged users (anyone who is logged in)
*/

router.route('/').get((req, res) => {
    //Show all products of a user
});

router.route('/create').post((req, res) => {
    //Create new product for a user
});

router.route('/update').delete((req, res) => {
    //Update product for a user
});

router.route('/delete').delete((req, res) => {
    // Delete product
});

module.exports = router;