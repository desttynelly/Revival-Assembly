const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    image1: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    preacher: {
        type: String,
        required: true
    },
    ylink: {
        type: String,
        default:0
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Pserm', userSchema);



