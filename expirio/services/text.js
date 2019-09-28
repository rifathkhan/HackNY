const User = require("../models/user.models").User;
const accountSid = 'AC31e6e855f05fa191520bd71a9ed5ec96';
const authToken = '633ac6b681e8c34773e10d0ea34d4ea1';
const client = require('twilio')(accountSid, authToken);


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

function runText() {
    client.messages
        .create({
            body: 'Your medicine is expired',
            from: '+16467985298',
            to: '+13476564345'
        })
        .then(message => console.log(message.sid));
}

module.exports = { textForAll, runText };