const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    eimg: {
        type: String,
        required: true
    },
    etitle: {
        type: String,
        required: true,
    },
    etext: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Event', userSchema);



