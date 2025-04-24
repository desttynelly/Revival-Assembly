//my express server imports
const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const app = express();
//all my controller imports 
const 
{
  give,
  Pictures,
  Quotes,
  logIn,
  signup,
  LiveS,
  pserm,
  event,
  testi,
  blog



} 
= require("../controller/usercontroller");





// Configure Multer to use memory storage (so images are not saved locally)

const upload = multer({ storage: storage }).fields([
    { name: 'image1', maxCount: 1 },
]);




router.post('/admin/login', logIn);
router.post('/lives', LiveS);
router.post('/sermon', upload, pserm);
router.post('/event', upload, event);
router.post('/blog', upload, blog);
router.post('/testi', testi);
router.post('/give', give);
router.post('/pictures', upload, Pictures);
router.post('/quotes', upload, Quotes);
router.post('/admin/signup', signup);


  








module.exports = router;


















