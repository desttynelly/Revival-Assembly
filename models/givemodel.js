const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: false,
        lowercase: true,
        trim: true,

    },
    givingtype: {
        type: String,
        default: null,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    choose: {
        type: String,
        required: false,
        default: undefined
    },
    pastorname: {
        type: String,
        required: false,
        default: undefined
    },
    transactionRef: {
        type: String,
        required: true,
    },
    viewed: {
        type: Boolean,
        default: false
      }
      
    
}, {
    timestamps: true
});
module.exports = mongoose.model('Give', userSchema);



