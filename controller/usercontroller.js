

const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Give = require("../models/givemodel");
const Pic = require("../models/picture");
const Quo = require("../models/quote");
require("dotenv").config();
const jwt = require('jsonwebtoken');
const cloudinary = require("../cloudinary");
const multer = require('multer');
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
            res.render("admin/admin", {user: req.session.user})
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
          res.render("admin/admin", {user: req.session.user})
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



const partnership = async (req, res) => {
  try {
    const { fullname, phoneNumber, company, email, position, partnershiptype, organizationhelp, areaofinterest, impact, referral, contactmethod} = req.body;

    if (!fullname || !phoneNumber || !company || !email || !position || !partnershiptype || !areaofinterest || !impact || !referral || !contactmethod || !organizationhelp) {

      res.render("invest/partnership/404", {user: req.session.user})

      // return res.status(400).json({ status: "Failed", message: "Please fill out all fields." });
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
    const user = new Pathner({
      fullname,
      phoneNumber,
      company,
      email,
      position,
      partnershiptype,
      areaofinterest,
      impact,
      referral,
      contactmethod,
      organizationhelp
    });


      try {
          await user.save();
          // Generate a JWT token
          const token = jwt.sign({ id: user._id}, 'Adain', { expiresIn: '1h' });

          req.session.user = {
              id: user._id,
              email: user.email,
              fullname: user.fullname, 
              phoneNumber: user.phoneNumber,
              company: user.company,
              referral: user.referral,
              position: user.position,
              partnershiptype: user.partnershiptype,
              organizationhelp: user.organizationhelp,
              areaofinterest: user.areaofinterest,
              impact: user.impact,
              contactmethod: user.contactmethod
             
              
              // Add other fields as needed
          };
          res.render("invest/partnership", {user: req.session.user})
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

        res.render("invest/partnership/404", {user: req.session.user})

          // console.error('Error saving product:', error);
          //     res.status(500).send('Error saving product');
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

// Fetch Blog and Comments by Blog ID
const getBlogAndComments = async (req, res) => {
  try {
    const { id } = req.params; // Blog ID from URL
    console.log("Blog ID:", id);

    // Check if the blog exists
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).send("No blog found");
    }


    // Fetch comments associated with this blog
    const comments = await Comment.find({ blogId: id }).sort({ createdAt: -1 });

    // Render the blog page with the blog and comments data
    res.render('blogs/blog1', { blog, comments });
  } catch (error) {
    console.error("Error fetching blog or comments:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Save a New Comment
const saveComment = async (req, res) => {
  try {
    const { blogId, fullname, email, comments } = req.body;

    if (!blogId || !fullname || !email || !comments) {
      return res.status(400).json({ status: "Failed", message: "Please fill out all fields." });
    }

    // Create and save the new comment
    const comment = new Comments({ blogId, fullname, email, comments });
    await comment.save();


    // Redirect to the blog page
    res.redirect(`/blogs/${blogId}`, {user: req.session.user});
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ error: error.message });
  }
};





const order = async (req, res) => {
  try {
    const { fullname, phoneNumber, altphoneNumber, email, address, info, region, city, amountcost, amount, month, monthcost, total, deliveryCost, vat, serviceFees, urgencyFees, convenienceFees, bookingFees, insuranceFees} = req.body;

    if (!fullname || !phoneNumber || !email || !address || !city || !amountcost || !amount || !region || !total || !deliveryCost || !vat || !serviceFees || !urgencyFees || !convenienceFees || !bookingFees || !insuranceFees) {

      res.render("invest/partnership/200", {user: req.session.user})

      // return res.status(400).json({ status: "Failed", message: "Please fill out all fields." });
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
    const user = new Buy({
      fullname,
      phoneNumber,
      altphoneNumber,
      email,
      address,
      info,
      city,
      amountcost,
      amount,
      region,
      month,
      monthcost,
      total,
      deliveryCost,
      vat,
      serviceFees,
      urgencyFees,
      convenienceFees,
      bookingFees,
      insuranceFees
    });


      try {
          await user.save();
          // Generate a JWT token
          const token = jwt.sign({ id: user._id}, 'Adain', { expiresIn: '1h' });

          req.session.user = {
            fullname: user.fullname,
            phoneNumber: user.phoneNumber,
            altphoneNumber: user.altphoneNumber,
            email: user.email,
            address: user.address,
            info: user.info,
            region: user.region,
            city: user.city,
            amount: user.amount,
            amountcost: user.amountcost,
            month: user.month,
            monthcost: user.monthcost,
            deliveryCost: user.deliveryCost,
            vat: user.vat,
            serviceFees: user.serviceFees,
            urgencyFees: user.urgencyFees,
            convenienceFees: user.convenienceFees,
            bookingFees: user.bookingFees,
            insuranceFees: user.insuranceFees,
            total: user.total,
          };
          
          res.render("Quota/checkout", { user: req.session.user });

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

        res.render("Quota/checkout", {user: req.session.user})

          // console.error('Error saving product:', error);
          //     res.status(500).send('Error saving product');
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



module.exports =
{

  Pictures,
  Quotes,
  saveComment,
  getBlogAndComments,
  order,
  give
 
};