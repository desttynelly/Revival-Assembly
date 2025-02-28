const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    lives: {
        type: String,
        required: true,
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    },

}, {
    timestamps: true
});
module.exports = mongoose.model('Lives', userSchema);



