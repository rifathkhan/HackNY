const jwt  = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/user.model');
const auth = require('../services/authentication')

/*
Todo: finish the crud for user
We need to include authentication 
*/

router.route('/signUp').post((req, res) => {
    //Sign up

});

router.route('/login').get((req, res) => {
    //Login
});

router.route('/update').post((req, res) => {
    //Update account
});

router.route('/delete').delete((req, res) => {
    // Update account
});

module.exports = router;
