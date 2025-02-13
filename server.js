const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
// const userRoutes = require('./routes/userroutes');
const bodyparser = require('body-parser');
const cors = require("cors")

dotenv.config();
const app = express();

// mongoose.connect(process.env.MONGODB_CONNECTION).then(()=>{console.log("Database Connected")}).catch((err)=>{console.log(err)});

app.set('view engine', 'ejs');



// middle ware
app.set('view engine', 'ejs');
app.use (express.static(path.join(__dirname, "assets")));//host  express static files
app.set("views", path.join(__dirname, 'views'))
app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());



require('dotenv').config();







// Routes
// app.use('/', userRoutes);



// Routes
app.get('/', (req, res) => {
  res.render('index'); // Render signup form
});

app.get('/Sermon',(req,res)=>{
  res.render('sermons')
});

app.get('/events',(req,res)=>{
  res.render('events')
});

app.get('/testimonies',(req,res)=>{
  res.render('testimonies')
});


app.get('/blog',(req,res)=>{
  res.render('blog')
});

app.get('/about',(req,res)=>{
  res.render('about')
});


app.get('/contact',(req,res)=>{
  res.render('contact')
});

app.get('/testing',(req,res)=>{
  res.render('testing')
});

app.get('/testing1',(req,res)=>{
  res.render('testing1')
});


app.get('/watch',(req,res)=>{
  res.render('watch')
});




app.get('/admin/admin',(req,res)=>{
  res.render('admin/admin')
});

// app.get('/user/:id', async (req, res) => {
//   try {
//     const guest = await Guest.findById(req.params.id);

//     if (!guest) {
//       return res.status(404).send('Guest not found');
//     }

//     res.render('user', { guest });
//   } catch (err) {
//     res.status(500).send('Error fetching guest data: ' + err.message);
//   }
// });

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
