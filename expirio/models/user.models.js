const mongoose = require('mongoose');
const Schema = mongoose.Schema

/*

TODO:

Include password encryption for user

*/

// -----------------------------------------------------------------------------------
// Schemas
// -----------------------------------------------------------------------------------

// Schema for item
const itemSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String, 
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    duration: {
        type: String
    },
    expireDate: {
        type: Date,
        equired: true
    }
}, {
    timestamps: true
});

// Schema for user
const userSchema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    cellnumber: {
        type: String,
        required: true
    },
    items: [itemSchema]
}, {
    timestamps: true
});

// Creating and exporting user model


const User = mongoose.model('User', userSchema);
const Item = mongoose.model('Item', itemSchema);


module.exports = {User, Item}