

const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Give = require("../models/givemodel");
const Lives = require("../models/Livesmodel");
const Pserm = require("../models/Psermonmodel");
const Testi = require("../models/testimony");
const Event = require("../models/eventmodel");
const Blog = require("../models/blogmodel");
const Signup = require("../models/signup");
const Pic = require("../models/picture");
const Quo = require("../models/quote");
require("dotenv").config();
const jwt = require('jsonwebtoken');
const cloudinary = require("../cloudinary");
const multer = require('multer');
const streamifier  = require("streamifier");
// const upload = multer({ dest: 'uploads/' });




const give = async (req, res) => {
  try {
    const { name, phonenumber, email, givingtype, amount, choose} = req.body;

    if (!name || !phonenumber || !email || !givingtype || !amount || !choose ) {
      // res.render("fruit", {user: req.session.user})
      return res.status(400).json({ status: "Failed", message: "Please fill out all fields." });
    }

    let imageURL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

    // If an image file is provided
    if (req.file) {
      // Wrap the Cloudinary upload in a promise
     
        const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) {
              return res.status(500).send('Error uploading image to Cloudinary');
          }
         imageURL = result.secure_url;

      
           
         createuser()

        });
        
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);        
    }else{
      createuser()
  
      
    }

    async function createuser(){

       // Create a new user with the provided data and the image URL if available
    const user = new Give({
      name,
      phonenumber,
      email,
      givingtype,
      amount,
      choose,
    });


      try {
          await user.save();
          // Generate a JWT token
          const token = jwt.sign({ id: user._id}, 'Adain', { expiresIn: '1h' });

          req.session.user = {
              id: user._id,
              email: user.email,
              name: user.name, 
              phonenumber: user.phonenumber,
              givingtype: user.givingtype,
              amount: user.amount,
              givingtype: user.givingtype,
             
              
              // Add other fields as needed
          };
            // Redirect back to the referring page
        const returnUrl = req.headers.referer || "/"; // Fallback to home if no referrer
        return res.redirect(returnUrl);
          // res.status(200).json({
          //     status: "Success",
          //     message: "Login successful",
          //     token,
          //     user: {
          //         id: user._id,
          //         email: user.email,
          //         fullname: user.fullname,
          //         phoneNumber: user.phoneNumber,
          //         country: user.country,
          
          //         notificationsCount: user.notificationsCount,
          //         referralCount: user.referralCount,
          //         referredUsers: user.referredUsers,
          //         points: user.points,
          //         accountName: user.accountName
          //     }
          // });
          
      } catch (error) {
        // res.render("index", {user: req.session.user})
          console.error('Error saving product:', error);
              res.status(500).send('Error saving product');
      }
    }

   

    

   
  } catch (error) {
    console.error("Error during signup:", error);

    // Handle errors and ensure only one response
    if (!res.headersSent) {
      res.status(500).json({ status: "Failed", message: error.message });
    }
  }

  


};


const Pictures = async (req, res) => {
    try {
      const { picture} = req.body;
  
      if (!picture ) {
        // res.render("invest/Investment/404", {user: req.session.user})
        return res.status(400).json({ status: "Failed", message: "Please fill out all fields." });
      }
  
      let imageURL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  
      // If an image file is provided
      if (req.file) {
        // Wrap the Cloudinary upload in a promise
       
          const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) {
                return res.status(500).send('Error uploading image to Cloudinary');
            }
           imageURL = result.secure_url;

        
             
           createuser()

          });
          
          streamifier.createReadStream(req.file.buffer).pipe(uploadStream);        
      }else{
        createuser()
    
        
      }

      async function createuser(){

         // Create a new user with the provided data and the image URL if available
      const user = new Pic({
        picture
      });


        try {
            await user.save();
            // Generate a JWT token
            const token = jwt.sign({ id: user._id}, 'Adain', { expiresIn: '1h' });

            req.session.user = {
                id: user._id,
                picture: user.picture,
               
                
                // Add other fields as needed
            };
            const returnUrl = req.headers.referer || "/admin/admin"; // Fallback to home if no referrer
            return res.redirect("/admin/admin");
            // res.status(200).json({
            //     status: "Success",
            //     message: "Login successful",
            //     token,
            //     user: {
            //         id: user._id,
            //         email: user.email,
            //         fullname: user.fullname,
            //         phoneNumber: user.phoneNumber,
            //         country: user.country,
            
            //         notificationsCount: user.notificationsCount,
            //         referralCount: user.referralCount,
            //         referredUsers: user.referredUsers,
            //         points: user.points,
            //         accountName: user.accountName
            //     }
            // });
            
        } catch (error) {
          // res.render("invest/Investment/404", {user: req.session.user})
            // console.error('Error saving product:', error);
                res.status(500).send('Error saving product');
        }
      }
  
     
  
      
  
     
    } catch (error) {
      console.error("Error during signup:", error);
  
      // Handle errors and ensure only one response
      if (!res.headersSent) {
        res.status(500).json({ status: "Failed", message: error.message });
      }
    }

    

 
};



const Quotes = async (req, res) => {
  try {
    const { quotes} = req.body;

    if (!quotes ) {
      // res.render("invest/Investment/404", {user: req.session.user})
      return res.status(400).json({ status: "Failed", message: "Please fill out all fields." });
    }

    let imageURL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

    // If an image file is provided
    if (req.file) {
      // Wrap the Cloudinary upload in a promise
     
        const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) {
              return res.status(500).send('Error uploading image to Cloudinary');
          }
         imageURL = result.secure_url;

      
           
         createuser()

        });
        
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);        
    }else{
      createuser()
  
      
    }

    async function createuser(){

       // Create a new user with the provided data and the image URL if available
    const user = new Quo({
      quotes
    });


      try {
          await user.save();
          // Generate a JWT token
          const token = jwt.sign({ id: user._id}, 'Adain', { expiresIn: '1h' });

          req.session.user = {
              id: user._id,
              quotes: user.quotes,
             
              
              // Add other fields as needed
          };
          const returnUrl = req.headers.referer || "/admin/admin"; // Fallback to home if no referrer
          return res.redirect("/admin/admin");
          // res.status(200).json({
          //     status: "Success",
          //     message: "Login successful",
          //     token,
          //     user: {
          //         id: user._id,
          //         email: user.email,
          //         fullname: user.fullname,
          //         phoneNumber: user.phoneNumber,
          //         country: user.country,
          
          //         notificationsCount: user.notificationsCount,
          //         referralCount: user.referralCount,
          //         referredUsers: user.referredUsers,
          //         points: user.points,
          //         accountName: user.accountName
          //     }
          // });
          
      } catch (error) {
        // res.render("invest/Investment/404", {user: req.session.user})
          // console.error('Error saving product:', error);
              res.status(500).send('Error saving product');
      }
    }

   

    

   
  } catch (error) {
    console.error("Error during signup:", error);

    // Handle errors and ensure only one response
    if (!res.headersSent) {
      res.status(500).json({ status: "Failed", message: error.message });
    }
  }

  


};


const logIn = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Find the admin by email
      const admin = await Signup.findOne({ email });
      if (!admin) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Compare passwords using bcrypt
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Store user session
      req.session.user = {
          id: admin._id,
          email: admin.email
      };

      // Send success response
      res.render("admin/admin", { user: req.session.user});

  } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
  }
};





const signup = async (req, res) => {
  try {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({ status: "Failed", message: "Please fill out all fields." });
      }

      let imageURL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

      // If an image file is provided, upload it to Cloudinary
      if (req.file) {
          try {
              const result = await new Promise((resolve, reject) => {
                  const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                      if (error) return reject(error);
                      resolve(result);
                  });
                  streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
              });

              imageURL = result.secure_url; 
          } catch (error) {
              return res.status(500).send('Error uploading image to Cloudinary');
          }
      }

      // Call createUser function after processing the image
      await createUser(email, password, imageURL, req, res);

  } catch (error) {
      console.error("Error during signup:", error);

      if (!res.headersSent) {
          res.status(500).json({ status: "Failed", message: error.message });
      }
  }
};

async function createUser(email, password, imageURL, req, res) {
  try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new Signup({
          email,
          password: hashedPassword,
          profileImage: imageURL, // Assuming you have this field in your schema
      });

      await user.save();

      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, 'Adain', { expiresIn: '1h' });

      req.session.user = {
          id: user._id,
          email: user.email,
          profileImage: user.profileImage,
      };

      res.render("admin/admin", { user: req.session.user });

  } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).send('Error saving user');
  }
}



const LiveS = async (req, res) => {
  try {
    const { lives} = req.body;

    if (!lives ) {
      // res.render("invest/Investment/404", {user: req.session.user})
      return res.status(400).json({ status: "Failed", message: "Please fill out all fields." });
    }

    let imageURL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

    // If an image file is provided
    if (req.file) {
      // Wrap the Cloudinary upload in a promise
     
        const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) {
              return res.status(500).send('Error uploading image to Cloudinary');
          }
         imageURL = result.secure_url;

      
           
         createuser()

        });
        
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);        
    }else{
      createuser()
  
      
    }

    async function createuser(){

       // Create a new user with the provided data and the image URL if available
    const user = new Lives({
      lives
    });


      try {
          await user.save();
          // Generate a JWT token
          const token = jwt.sign({ id: user._id}, 'Adain', { expiresIn: '1h' });

          req.session.user = {
              id: user._id,
              lives: user.lives,
             
              
              // Add other fields as needed
          };
          const returnUrl = req.headers.referer || "admin/admin"; // Fallback to home if no referrer
          return res.redirect("/admin/admin");
  
          
      } catch (error) {
              res.status(500).send('Error saving product');
      }
    }

   

    

   
  } catch (error) {
    console.error("Error during signup:", error);

    if (!res.headersSent) {
      res.status(500).json({ status: "Failed", message: error.message });
    }
  }

  


};





const pserm = async (req, res) => {
  const { simg, title, preacher, ylink } = req.body;



  try {
      if (!simg || !title || !preacher || !ylink) {
          return res.status(400).json({ status: "Failed", message: "Please fill out all fields." });
      }

   

      // Create new user document
      const user = new Pserm({
          simg,
          title,
          preacher,
          ylink,
      });

      try {
          await user.save();
          const token = jwt.sign({ id: user._id }, "Adain", { expiresIn: "1h" });

          req.session.user = {
              id: user._id,
              simg: user.simg,
              title: user.title,
              preacher: user.preacher,
              ylink: user.ylink,
          };

          return res.redirect("/admin/admin");
      } catch (error) {
          res.status(500).send("Error saving user");
      }
  } catch (error) {
      console.error("Error during upload:", error);

      if (!res.headersSent) {
          res.status(500).json({ status: "Failed", message: error.message });
      }
  }
};



const event = async (req, res) => {
  const { eimg, etitle, etext, time, date } = req.body;



  try {
      if (!eimg || !etitle || !etext) {
          return res.status(400).json({ status: "Failed", message: "Please fill out all fields." });
      }

   

      // Create new user document
      const user = new Event({
          eimg,
          etitle,
          etext,
          time,
          date
      });

      try {
          await user.save();
          const token = jwt.sign({ id: user._id }, "Adain", { expiresIn: "1h" });

          req.session.user = {
              id: user._id,
              eimg: user.eimg,
              etitle: user.etitle,
              etext: user.etext,
              time: user.time,
              date: user.date
          };

          return res.redirect("/admin/admin");
      } catch (error) {
          res.status(500).send("Error saving user");
      }
  } catch (error) {
      console.error("Error during upload:", error);

      if (!res.headersSent) {
          res.status(500).json({ status: "Failed", message: error.message });
      }
  }
};


const testi = async (req, res) => {
  const { pname, ttitle, tinfo } = req.body;



  try {
      if (!pname || !ttitle || !tinfo) {
          return res.status(400).json({ status: "Failed", message: "Please fill out all fields." });
      }

   

      // Create new user document
      const user = new Testi({
          pname,
          ttitle,
          tinfo,
      });

      try {
          await user.save();
          const token = jwt.sign({ id: user._id }, "Adain", { expiresIn: "1h" });

          req.session.user = {
              id: user._id,
              pname: user.pname,
              ttitle: user.ttitle,
              tinfo: user.tinfo
          };

          return res.redirect("/admin/admin");
      } catch (error) {
          res.status(500).send("Error saving user");
      }
  } catch (error) {
      console.error("Error during upload:", error);

      if (!res.headersSent) {
          res.status(500).json({ status: "Failed", message: error.message });
      }
  }
};




const blog = async (req, res) => {
  const { bloimg, blotitle, bloinfo, blopimg, blopname, blodate } = req.body;



  try {
      if (!bloimg || !blotitle || !bloinfo || !blopimg || !blopname || !blodate) {
          return res.status(400).json({ status: "Failed", message: "Please fill out all fields." });
      }

   

      // Create new user document
      const user = new Blog({
          bloimg,
          blotitle,
          bloinfo,
          blopimg,
          blopname,
          blodate
      });

      try {
          await user.save();
          const token = jwt.sign({ id: user._id }, "Adain", { expiresIn: "1h" });

          req.session.user = {
              id: user._id,
              bloimg: user.bloimg,
              blotitle: user.blotitle,
              bloinfo: user.bloinfo,
              blopimg: user.blopimg,
              blopname: user.blopname,
              blodate: user.blodate
          };

          return res.redirect("/admin/admin");
      } catch (error) {
          res.status(500).send("Error saving user");
      }
  } catch (error) {
      console.error("Error during upload:", error);

      if (!res.headersSent) {
          res.status(500).json({ status: "Failed", message: error.message });
      }
  }
};





module.exports =
{

  Pictures,
  Quotes,
  give,
  logIn,
  signup,
  LiveS,
  pserm,
  event,
  testi,
  blog
 
};