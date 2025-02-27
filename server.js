const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const Pic = require('./models/picture');
const Quo = require('./models/quote');
const userRoutes = require('./routes/userroutes');
const bodyparser = require('body-parser');
const session = require("express-session")
const cors = require("cors")

dotenv.config();
const app = express();

// mongoose.connect(process.env.MONGODB_CONNECTION).then(()=>{console.log("Database Connected")}).catch((err)=>{console.log(err)});

mongoose.connect(process.env.MONGODB_CONNECTION).then(()=>{console.log("Database Connected")}).catch((err)=>{console.log(err)});
app.use(express.json()); // For parsing JSON body
app.use(session({
    secret: 'Dien', // Replace with your own secret
    resave: false,
    saveUninitialized: true,
    store: "",
    cookie: { secure: false } // Set to true if using HTTPS
  }));
// middle ware

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
app.use('/api/auth', userRoutes)



// Routes


app.get("/", async (req, res) => {
    try {
        const pictures = await Pic.find().sort({ createdAt: -1 }).limit(8); 
        const quotes = await Quo.find();
        res.render("index", { Pic: pictures, Quo: quotes });
    } catch (error) {
        console.error("Error fetching pictures:", error);
        res.render("index", { Pic: [] });
    }
});



app.get('/home', (req, res) => {
  res.render('home'); // Render signup form
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

app.get('/fruit',(req,res)=>{
  res.render('fruit')
});



app.get('/port',(req,res)=>{
  res.render('port')
});

app.get("/gallery", async (req, res) => {
  try {
      const pictures = await Pic.find(); 
      const quotes = await Quo.find();
      res.render("gallery", { Pic: pictures, Quo: quotes });
  } catch (error) {
      console.error("Error fetching pictures:", error);
      res.render("index", { Pic: [] });
  }
});




app.get('/admin/admin',(req,res)=>{
  res.render('admin/admin')
});

app.get("/admin/admin", async (req, res) => {

      // Check if session exists
      if (!req.session.user) {
          return res.redirect("/login"); // Redirect to login page
      }

      // Fetch user data
      const signup = await Just.find(); 
      res.render("admin/admin", { signup });
  
});


app.get('/login', (req, res) => {
  res.render('admin/html/adminsignin'); // Render investment.ejs
});

app.get('/signup', (req, res) => {
  res.render('404'); // Render investment.ejs
});

app.get('/api/auth/admin/signup', (req, res) => {
   // Check if session exists
   if (!req.session.user) {
    return res.redirect("/login"); // Redirect to login page
 }
  res.render('admin/html/adminsignin'); // Render investment.ejs
});

app.get('/api/auth/admin/login', (req, res) => {

   // Check if session exists
   if (!req.session.user) {
    return res.redirect("/login"); // Redirect to login page
}
  res.render('admin/html/adminsignin'); // Render investment.ejs
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
const PORT = process.env.PORT || 5700;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
