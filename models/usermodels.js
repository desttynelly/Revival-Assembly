const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        default:0
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,

    },
    referral: {
        type: String,
        default: null,
    },
    investmenttype: {
        type: String,
        required: false
    },
    investmentamount: {
        type: Number,
        required: false
    },
    partnershiptype: {
        type: String,
        required: false
    },
    areaofinterest: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: false
    },
    impact: {
        type: String,
        required: false
    },
    contactmethod: {
        type: String,
        required: false
    },
    organizationhelp: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('User', userSchema);



