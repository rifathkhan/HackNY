const User = require("../models/user.models").User;

function textForAll(){
    return User.find()
    .then(users => {
        users.forEach(user => {
            // we will dump a function for twillo later
            console.log(`username: ${user.username}`);
            console.log(`cellnumber: ${user.cellnumber}`);
            console.log('----------------------------------');
        });
    });
}

module.exports = { textForAll };