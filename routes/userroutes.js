//my express server imports
const express = require('express');
const router = express.Router();
const multer = require("multer")
const app = express();
//all my controller imports 
const 
{
  give,
  Pictures,
  Quotes


} 
= require("../controller/usercontroller");



// Configure Multer to use memory storage (so images are not saved locally)
const storage = multer.memoryStorage(); // Using memory storage for easier handling
const upload = multer({ storage: storage }).fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]);


router.post('/give', give);
router.post('/pictures', Pictures);
router.post('/quotes', Quotes);

  








module.exports = router;