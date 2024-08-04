var express = require("express");
var { hashPassword,sendPasswordOtp,userRegisteration, sendWelcomeEmail,resendWelcomeEmail,resetEmail, sendUserDetails, userRegisteration } = require("../../utils");
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
  const { firstName, lastName, email,status , timestamp,address,item} = req.body;

  try {
   
    const newUser = {
      firstName,
      lastName,
      email,
      item,
      address,
      status,
      timestamp, 
    };
    const createdUser = await UsersDatabase.create(newUser);
    
   

    return res.status(200).json({ code: "Ok", data: createdUser });
  } catch (error) {
    console.error("Error:", error);
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
