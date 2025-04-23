const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    image1: {
        type: String,
        required: true
    },
    blotitle: {
        type: String,
        required: true,
    },
    bloinfo: {
        type: String,
        required: true
    },
    blopimg: {
        type: String,
        required: true
    },
    blopname: {
        type: String,
        required: true
    },
    blodate: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Blog', userSchema);



