const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    pname: {
        type: String,
        required: true
    },
    ttitle: {
        type: String,
        required: true,
    },
    tinfo: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Testi', userSchema);



