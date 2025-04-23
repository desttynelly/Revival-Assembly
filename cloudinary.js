
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: "drxsvfsqf",
  api_key: "134923172246616",
  api_secret: "GMjt27s9pzwyor86ilb3YG39tjM",
});

module.exports = cloudinary;