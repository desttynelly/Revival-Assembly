const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const User = require("./models/signup");
const Pic = require('./models/picture');
const Contact = require('./models/Contact');
const LiveS = require('./models/Livesmodel');
const Event = require('./models/eventmodel');
const Give = require("./models/givemodel");
const Testi = require("./models/testimony");
const Pserm = require('./models/Psermonmodel');
const Blog = require('./models/blogmodel');
const Quo = require('./models/quote');
const userRoutes = require('./routes/userroutes');
const bodyparser = require('body-parser');
const session = require("express-session")
const cors = require("cors")

dotenv.config();
const app = express();

// mongoose.connect(process.env.MONGODB_CONNECTION).then(()=>{console.log("Database Connected")}).catch((err)=>{console.log(err)});

mongoose.connect(process.env.MONGODB_CONNECTION).then(()=>{
  console.log("Database Connected")}).catch((err)=>{console.log(err)});
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
        const quotes = await Quo.find().sort({ createdAt: -1 }).limit(13);
        const event = await Event.find().sort({ createdAt: -1 }).limit(3);
        res.render("index", { Pic: pictures, Quo: quotes, event });
    } catch (error) {
        console.error("Error fetching pictures:", error);
        res.render("index", { Pic: [] });
    }
});



app.get('/home', (req, res) => {
  res.render('home'); // Render signup form
});


app.get("/Sermon", async (req, res) => {
  try {
      const lives = await LiveS.find().sort({ createdAt: -1 }).limit(1);
      const pserm = await Pserm.find(); 
      res.render("sermons", { lives, pserm });
  } catch (error) {
      console.error("Error fetching pictures:", error);
      res.render("404", { Pic: [] });
  }
});


app.get("/events", async (req, res) => {
  try {
    
      const event = await Event.find().sort({ createdAt: -1 });
      res.render("events", { event });
  } catch (error) {
      console.error("Error fetching pictures:", error);
      res.render("404", { Pic: [] });
  }
});



app.get("/testimonies", async (req, res) => {
  try {
      const testi = await Testi.find(); 
      res.render("testimonies", { testi });
  } catch (error) {
      console.error("Error fetching pictures:", error);
      res.render("404", { Pic: [] });
  }
});



app.get("/blog", async (req, res) => {
  try {
      const blog = await Blog.find(); 
      res.render("blog", { blog });
  } catch (error) {
      console.error("Error fetching pictures:", error);
      res.render("404", { Pic: [] });
  }
});


app.get('/blog/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.render("notfound404");
    }
    res.render("blog/blog1", { blog });
  } catch (err) {
    console.error('Error fetching blog:', err);
    res.status(500).send('Server error');
  }
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
      const pictures = await Pic.find().sort({ createdAt: -1 }); 
      const quotes = await Quo.find().sort({ createdAt: -1 });
      res.render("gallery", { Pic: pictures, Quo: quotes });
  } catch (error) {
      console.error("Error fetching pictures:", error);
      res.render("index", { Pic: [] });
  }
});


// Admin Dashboard Route
app.get('/admin/admin', async (req, res) => {
  try {
    // Ensure user is logged in
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const user = await User.findById(req.params.userId);

    // Fetch from Give and Contact models
    const gives = await Give.find().sort({ createdAt: -1 });
    const contacts = await Contact.find().sort({ createdAt: -1 });

    // Format Give updates
    const giveUpdates = gives.map(g => ({
      id: g._id,
      type: 'give',
      name: g.name,
      amount: g.amount,
      message: g.givingtype,
      choose: g.choose,
      pastorname: g.pastorname,
      viewed: g.viewed,
      createdAt: g.createdAt || g.date
    }));

    // Format Contact updates (testimony, prayer, enquiry, application)
    const contactUpdates = contacts.map(c => ({
      id: c._id,
      type: 'contact',
      name: c.fullname,
      message: c.info,
      email: c.email,
      category: c.category,
      viewed: c.viewed,
      createdAt: c.createdAt
    }));

    // Merge & sort all updates
    const updates = [...giveUpdates, ...contactUpdates].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Count unseen
    const unseenCount = updates.filter(u => !u.viewed).length;

    // Pass updates, unseenCount and user info to template
    res.render('admin/admin', {
      updates,
      unseenCount,
      user: req.session.user,
    });

  } catch (err) {
    console.error(err);
    res.render('amin/admin', {
      updates: [],
      unseenCount: 0,
      user: req.session.user || null
    });
  }
});

// Logout Route
app.get('/admin/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Unable to logout');
    }
    res.redirect('/login'); // Redirect to login after logout
  });
});


app.post('/admin/mark-as-seen', async (req, res) => {
  try {
    await Give.updateMany({ viewed: false }, { $set: { viewed: true } });
    await Contact.updateMany({ viewed: false }, { $set: { viewed: true } });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
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
