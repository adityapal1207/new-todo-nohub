const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({


    firstname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age:
    {
        type: Number,
        required: true,
    },
    dob: {
        type: Date,
        required: false,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    followers: [
        {
            userId: {
                type: Schema.Types.Object,
                required: true,
                ref: 'users'

            },
            dateTime: {
                type: Date,
                required: true
            },
            name: {
                type: String

            },

        }]

})
module.exports = User = mongoose.model('user', UserSchema);
// String
// Number
// Date
// Boolean
// objectId 
// Array
// Object
// Decimal ,etc    