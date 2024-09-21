var express = require("express");
var { hashPassword,sendPasswordOtp,userRegisteration,sendOrderEmailToClient, sendOrderEmailToAdmin,sendWelcomeEmail,resendWelcomeEmail,resetEmail, sendUserDetails, userRegisteration } = require("../../utils");
const UsersDatabase = require("../../models/User");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");

// Function to generate a referral code
function generateReferralCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}


router.post("/register", async (req, res) => {
  const { name, username, email, password, phoneNumber} = req.body;

  try {
    // Check if any user has that email
    // const user = await UsersDatabase.findOne({ email });

    // if (user) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Email address is already taken",
    //   });
    // }


   
    const newUser = {
      name,
      username,
      email,
      phoneNumber,
      artWorks:[],
      collections:[],
      balance:0,
      verification:[],
      socialUsernames:[],
      password:hashPassword(password),
      transactions: [],
      withdrawals: [],
      verify:"pending"
      
    };

  
    const createdUser = await UsersDatabase.create(newUser);
    const token = uuidv4();
    sendWelcomeEmail({ to: email, token });
userRegisteration({name,email});

    return res.status(200).json({ code: "Ok", data: createdUser });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


router.post("/register/package", async (req, res) => {
  const { firstName, lastName, email, status, timestamp, address, item } = req.body;

  // Debugging: Log the received request body to verify the data
  console.log("Received request body:", req.body);

  try {
    // Ensure the address and item are in array format
    const newUser = {
      firstName,
      lastName,
      item: Array.isArray(item) ? item : [item], // Ensure item is an array
      address: Array.isArray(address) ? address : [address], // Ensure address is an array
      email,
      status,
      timestamp
    };

    // Create new user in the database
    const createdUser = await UsersDatabase.create(newUser);
    sendOrderEmailToClient({firstName,lastName,email,item,address})
    sendOrderEmailToAdmin({firstName,lastName,email,item,address})
   
    // Send successful response
    return res.status(200).json({ code: "Ok", data: createdUser });
  } catch (error) {
    console.error("Error:", error);
    
    // Send error response in case of failure
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});






router.post("/register/resend", async (req, res) => {
  const { email } = req.body;
  const user = await UsersDatabase.findOne({ email });

  if (!user) {
    res.status(404).json({
      success: false,
      status: 404,
      message: "User not found",
    });

    return;
  }

  try {
    
    res.status(200).json({
      success: true,
      status: 200,
      message: "OTP resent successfully",
    });
    
 sendPasswordOtp({to:req.body.email})
   
    // sendUserDetails({
    //   to:req.body.email
    //   });
      

  } catch (error) {
    console.log(error);
  }
});


router.post("/register/reset", async (req, res) => {
  const { email } = req.body;
  const user = await UsersDatabase.findOne({ email });

  if (!user) {
    res.status(404).json({
      success: false,
      status: 404,
      message: "User not found",
    });

    return;
  }

  try {
    
    res.status(200).json({
      success: true,
      status: 200,
      message: "OTP resent successfully",
    });

    resetEmail({
      to:req.body.email
    });


   

  } catch (error) {
    console.log(error);
  }
});

router.post("/register/otp", async (req, res) => {
  const { email } = req.body;
  const { password }=req.body;
  const {name }=req.body;
  const user = await UsersDatabase.findOne({ email });

  if (!user) {
    res.status(404).json({
      success: false,
      status: 404,
      message: "User not found",
    });

    return;
  }

  try {
    
    res.status(200).json({
      success: true,
      status: 200,
      message: "OTP correct ",
    });

    sendUserDetails({
      to:req.body.email,
      password:req.body.password,
      name:req.body.name
    });


   

  } catch (error) {
    console.log(error);
  }
});





module.exports = router;
