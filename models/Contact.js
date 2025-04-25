// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['prayer', 'testimony', 'enquiry', 'application'],
    required: true
  },
  info: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  viewed: {
    type: Boolean,
    default: false
  }
  
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
