const User = require("../models/user.models").User;
const accountSid = 'AC31e6e855f05fa191520bd71a9ed5ec96';
const authToken = '633ac6b681e8c34773e10d0ea34d4ea1';
const { splitExpr } = require("./itemservices")
const client = require('twilio')(accountSid, authToken);

const fromNum = '+16467985298';

//----------------------------------------------------------------------------
// Helper functions
//----------------------------------------------------------------------------

function runText(from, to, body) {
    client.messages
        .create({
            body: body,
            from: from, 
            to: to
        })
        .then(message => console.log(message.sid))
        .catch(err => console.log(err));
}

function addCountryCode(c, numStr){
    return c+numStr;
}

function parseItem(item){
    itemstr = '';
    itemstr += `\tname: ${item.name}\n`;
    itemstr += `\ttype: ${item.type}\n`;
    itemstr += `\texpireDate: ${item.expireDate.toLocaleDateString()}\n`;
    return itemstr;
}

function textStr(user){
    textbody = "";
    textbody += `${user.username}\n\n`;
    splitArr = splitExpr(user.items);
    exprItems = splitArr[0];
    goodItems = splitArr[1];
    textbody += `Expired items:\n----------\n`;
    exprItems.forEach(item => {
        textbody += `${parseItem(item)}\n`;
    });
    textbody += `Good items:\n----------\n`;
    goodItems.forEach(item => {
        textbody += `${parseItem(item)}\n`;
    });
    return textbody;
}

//----------------------------------------------------------------------------
// Run functions
//----------------------------------------------------------------------------

function textForAll(){
    return User.find()
    .then(users => {
        users.forEach(user => {
            runText(fromNum, addCountryCode('+1', user.cellnumber), textStr(user));
        });
    });
}

module.exports = { textForAll };