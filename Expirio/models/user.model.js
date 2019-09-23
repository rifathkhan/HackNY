const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    type: {
        type: String,
        required: true
    },
    expireDate: {
        type: Date,
        equired: true
    }
}, {
    timestamps: true
});

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
        required: false,
        trim: true
    },
    cellnumber: {
        type: String,
        required: false
    },
    products: [productSchema]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User