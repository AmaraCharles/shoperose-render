const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const axios = require("axios");
var nodemailer = require("nodemailer");
const speakeasy = require('speakeasy');

const secret = speakeasy.generateSecret({ length: 4 });


const hashPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

const compareHashedPassword = (hashedPassword, password) => {
  const isSame = bcrypt.compareSync(password, hashedPassword);
  return isSame;
};




// const sendDepositEmail = async ({ from, amount, method,timestamp}) => {
//   let transporter = nodemailer.createTransport({
//     host: "mail.privateemail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.EMAIL_USER, // generated ethereal user
//       pass: process.env.EMAIL_PASSWORD, // generated ethereal password
//     },
//   });

//   let info = await transporter.sendMail({
//     from: `${process.env.EMAIL_USER}`, // sender address
//     to: "support@shoprose.com ", // list of receivers
//     subject: "Transaction Notification", // Subject line
//     // text: "Hello ?", // plain text body
//     html: `



const sendWithdrawalRequestEmail = async ({  from, amount, method,address }) => {
  
  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`, // sender address
    to: "support@shoprose.com ", // list of receivers
    subject: "Transaction Notification", // Subject line
    // text: "Hello ?", // plain text body
    html: `

    <html>
    <p>Hello Chief</p>

    <p>${from} just applied to withdraw ${amount}ETH.
    </p>

    <p>Best wishes,</p>
    <p>shoprose Team</p>

    </html>
    
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};


const sendOrderEmailToClient = async ({  firstName,lastName,email,item,address }) => {
  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`, // sender address
    to: `${email}`, // list of receivers
    subject: "Your Order Confirmation", // Subject line
    html: `
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Hi ${firstName} ${lastName},</h2>
        <p>Thank you for your purchase! We have successfully received your order, and it is now being processed. Below are the details of your order:</p>
        
        <hr>
        
        <h3>Order Details:</h3>
        <p><strong>Order Number:</strong> ${item[0]._id}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>

        <hr>

        <h3>Items Ordered:</h3>
        <ul>
        ${item.map(orderItem => `
            <li>
                <strong>Product:</strong> ${orderItem.title}<br>
                <strong>Size:</strong> ${orderItem.size}<br>
                <strong>Price:</strong> $${orderItem.price}<br>
                <strong>Quantity:</strong> ${orderItem.qty}
            </li>
            <br>
        `).join('')}
        </ul>
        
        <hr>

        <h3>Shipping Address:</h3>
        <p>${address.home},<br>
        ${address.city}, ${address.state},<br>
        ${address.country}<br>
        <strong>Phone:</strong> ${address.phone}</p>

        <hr>

        <h3>Total:</h3>
        <p><strong>$${orderTotal}</strong></p>

       

        <p>If you have any questions, feel free to reach out to our support team at <a href="mailto:support@yourstore.com">support@yourstore.com</a>.</p>

        <br>
        <p>Best regards,<br>
        The Shoprose Team</p>
    </body>
    </html>
    `, // html body
});

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};


const userRegisteration = async ({  name,email}) => {
  
  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`, // sender address
    to: "support@shoprose.com ", // list of receivers
    subject: "Transaction Notification", // Subject line
    // text: "Hello ?", // plain text body
    html: `

    <html>
    <p>Hello Chief</p>

    <p>${name} with email ${email} just signed up.Please visit your dashboard for confirmation.
    </p>

    <p>Best wishes,</p>
    <p>shoprose Team</p>

    </html>
    
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};


const sendWithdrawalEmail = async ({  to,address, amount, method,timestamp,from }) => {
  
  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`, // sender address
    to: to, // list of receivers
    subject: "Transaction Notification", // Subject line
    // text: "Hello ?", // plain text body
    html: `

    <html>
    <p>Hello ${from}</p>

    <p>You just placed a withdrawal request for ${amount}ETH.
    </p>


    
    <p>Best wishes,</p>
    <p>shoprose Team</p>

    </html>
    
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};


const sendDepositEmail = async ({  price , collection,title,description,from,timestamp, }) => {
  
  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`, // sender address
    to: "support@shoprose.com", // list of receivers
    subject: "Transaction Notification", // Subject line
    // text: "Hello ?", // plain text body
    html: `

    <html>
    <p>Hello Chief</p>

    <p>${from} said he/she just sent $${amount} worth of ${method}. Please confirm the transaction. 
    Also, don't forget to update his/her balance from your admin dashboard
    </p>
 <p>${timestamp}</p>
    <p>Best wishes,</p>
    <p>shoprose Team</p>

    </html>
    
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};

const sendDepositApproval = async ({  from, amount, method,timestamp,to}) => {
  
  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`, // sender address
    to: to, // list of receivers
    subject: "Transaction Notification", // Subject line
    // text: "Hello ?", // plain text body
    html: `

    <html>
    <p>Hello ${from}</p>

    <p>Your deposit of ${amount} of ${method} has been approved.</p>
    <p>Kindly visit your dashboard for more information</p>
    </p>
 <p>${timestamp}</p>
    <p>Best wishes,</p>
    <p>shoprose Team</p>

    </html>
    
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};

const sendPlanEmail = async ({  from, subamount, subname,timestamp }) => {
  
  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`, // sender address
    to: "support@shoprose.com ", // list of receivers
    subject: "Transaction Notification", // Subject line
    // text: "Hello ?", // plain text body
    html: `

    <html>
    <p>Hello Chief</p>

    <p>${from} said he/she just subscribed $${subamount}  of ${subname} plan. 
    </p>
 <p>${timestamp}</p>
    <p>Best wishes,</p>
    <p>shoprose Team</p>

    </html>
    
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};



const sendForgotPasswordEmail = async (email) => {
  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`, // sender address
    to: `${email}`, // list of receivers
    subject: "Password Reset", // Subject line
    // text: "Hello ?", // plain text body
    html: `
    <html>
    <p>Dear esteemed user,</p>

    <p>Forgot your password?</p>
    <p>We received a request to reset the password for your account</p>

    <p>To reset your password, click on the link below
    <a href="https://Bevfx.com/reset-password">
    reset password
    </p>


    <p>If you did not make this request, please ignore this email</p>

    <p>Best wishes,</p>
    <p>Bevfx Team</p>
    </html>
    
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};

const sendVerificationEmail = async ({ from, url }) => {
  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`, // sender address
    to: "support@shoprose.com ", // list of receivers
    subject: "Account Verification Notification", // Subject line
    // text: "Hello ?", // plain text body
    html: `
    <html>
    <p>Hello Chief</p>

    <p>${from} just verified his Bevfx Team Identity
    </p>

    <p>Click <a href="${url}">here</a> to view the document</p>


    <p>Best wishes,</p>
    <p>shoprose Team</p>

    </html>
    
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};

const sendWelcomeEmail = async ({ to, token }) => {
  async function verifyEmail() {
  

    const response = axios.put(
      `https://toptradexp.com/toptradexp.com/verified.html`
    );

    console.log("=============VERIFY EMAIL=======================");
    console.log(response);
    console.log("====================================");
  }

  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`, // sender address
    to: to, // list of receivers
    subject: "Account Verification", // Subject line
    // text: "Hello ?", // plain text body
    html: `
    <html>
    <h2>Welcome to chemringoptions</h2>

    <p>Let us know if this is really your email address, 
    to help us keep your account secure.
    </p>


    <p>Confirm your email and let's get started!</p>

    <p>Your OTP is: ${speakeasy.totp({ secret: secret.base32, encoding: 'base32' })}</p>
    <p>Best wishes,</p>
    <p>shoprose Team</p>

    </html>
    
    `, // html body
  });
//'<a href="https://Bevfx.com/Bevfx.com/verified.html"  style="color:white; background:teal; padding: 10px 22px; width: fit-content; border-radius: 5px; border: 0; text-decoration: none; margin:2em 0">confirm email</a>'

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};






const resendWelcomeEmail = async ({ to, token }) => {
  async function reverifyEmail() {
  

    const response = axios.put(
      `https://toptradexp.com/toptradexp.com/verified.html`
    );

    console.log("=============VERIFY EMAIL=======================");
    console.log(response);
    console.log("====================================");
  }

  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`, // sender address
    to: to, // list of receivers
    subject: "Account Verification", // Subject line
    // text: "Hello ?", // plain text body
    html: `
    <html>
    <h2>Welcome to chemringoptions</h2>

    <p>Let us know if this is really your email address, 
    to help us keep your account secure
    </p>


    <p>Confirm your email and let's get started!</p>

    <p>Your OTP is: ${speakeasy.totp({ secret: secret.base32, encoding: 'base32' })}</p>
    <p>Best wishes,</p>
    <p>shoprose Team</p>

    </html>
    
    `, // html body
  });
//'<a href="https://Bevfx.com/Bevfx.com/verified.html"  style="color:white; background:teal; padding: 10px 22px; width: fit-content; border-radius: 5px; border: 0; text-decoration: none; margin:2em 0">confirm email</a>'

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};

const sendPasswordOtp = async ({ to }) => {
  async function reverifyEmail() {
  

    const response = axios.put(
      `https://toptradexp.com/toptradexp.com/verified.html`
    );

    console.log("=============VERIFY EMAIL=======================");
    console.log(response);
    console.log("====================================");
  }

  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`, // sender address
    to: to, // list of receivers
    subject: "Password Reset", // Subject line
    // text: "Hello ?", // plain text body
    html: `
    <html>
    <h2>Welcome to chemringoptions</h2>

    <p>Your OTP is: ${speakeasy.totp({ secret: secret.base32, encoding: 'base32' })}</p>
    <p>This OTP is valid for a short period of time. Do not share it with anyone.</p>
    <p>If you did not request this OTP, please ignore this email.</p>



    <p>Best wishes,</p>
    <p>shoprose Team</p>

    </html>
    
    `, // html body
  });
//'<a href="https://Bevfx.com/Bevfx.com/verified.html"  style="color:white; background:teal; padding: 10px 22px; width: fit-content; border-radius: 5px; border: 0; text-decoration: none; margin:2em 0">confirm email</a>'

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};



const resetEmail = async ({ to, token }) => {
  async function reverifyEmail() {
  

    const response = axios.put(
      `https://toptradexp.com.com/toptradexp.com/verified.html`
    );


    console.log("=============VERIFY EMAIL=======================");
    console.log(response);
    console.log("====================================");
  }

  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`, // sender address
    to: to, // list of receivers
    subject: "Change Password", // Subject line
    // text: "Hello ?", // plain text body
    html: `
    <html>
    <h2>Welcome to chemringoptions</h2>

    <p>You have requested to change your password.Please use the following OTP to reset your password.
    </p>


    
    <p>Your OTP is: ${speakeasy.totp({ secret: secret.base32, encoding: 'base32' })}</p>


    <p>If you did not request this password reset,please contact our support immediately.</p>

    <p>Best wishes,</p>
    <p>shoprose Team</p>

    </html>
    
    `, // html body
  });
//'<a href="https://Bevfx.com/Bevfx.com/verified.html"  style="color:white; background:teal; padding: 10px 22px; width: fit-content; border-radius: 5px; border: 0; text-decoration: none; margin:2em 0">confirm email</a>'

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};







const sendUserDepositEmail = async ({  from, amount, to,method,timestamp }) => {
  async function verifyEmail() {
  

    const response = axios.put(
      `https://toptradexp.com/toptradexp.com/verified.html`
    );

    console.log("=============VERIFY EMAIL=======================");
    console.log(response);
    console.log("====================================");
  }

  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`, // sender address
    to:to, // list of receivers
    subject: "Transaction Notification", // Subject line
    // text: "Hello ?", // plain text body
    html: `

    <html>
    <p>Hello ${from}</p>

    <p>You have sent a deposit order. Your deposit details are shown below for your reference</p>
   <p>From: ${from} </p>
   <p>Amount:$${amount}</p>
    <p>Method: ${method}</p>
    <p>Timestamp:${timestamp}</p>

    <p>All payments are to be sent to your personal wallet address</p>

    <p>Best wishes,</p>
    <p>shoprose Team</p>

    </html>
    
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};

const sendUserPlanEmail = async ({  from, subamount, to,subname,timestamp }) => {
  async function verifyEmail() {
  

    const response = axios.put(
      `https://toptradexp.com/toptradexp.com/verified.html`
    );

    console.log("=============VERIFY EMAIL=======================");
    console.log(response);
    console.log("====================================");
  }

  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`, // sender address
    to:to, // list of receivers
    subject: "Transaction Notification", // Subject line
    // text: "Hello ?", // plain text body
    html: `

    <html>
    <p>Hello ${from},</p>

    <p>You  successfully subscribed to $${subamount} worth of ${subname} plan at ${timestamp}</p>
    <p>Best wishes,</p>
    <p>shoprose Team</p>

    </html>
    
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};



const sendUserDetails = async ({ to,password,name,token }) =>{
  async function reverifyEmail() {
  

    const response = axios.put(
      `https://toptradexp.com.com/toptradexp.com/verified.html`
    );


    console.log("=============VERIFY EMAIL=======================");
    console.log(response);
    console.log("====================================");
  }

  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`, // sender address
    to: to, // list of receivers
    subject: "User Details", // Subject line
    // text: "Hello ?", // plain text body
    html: `
    <html>
    <h2>Hello ${name},</h2>

    <p>Thank you for registering on our site
    </p>

    <p>Your login information:</p>
   <p> Email: ${to}</p>
   <p> Password: ${password}</p>


    
    

    <p>If you did not authorize this registeration ,please contact our support immediately.</p>

    <p>Best wishes,</p>
    <p>shoprose Team</p>

    </html>
    
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}



const sendKycAlert = async ({ name }) =>{
  async function reverifyEmail() {
  

    const response = axios.put(
      `https://toptradexp.com.com/toptradexp.com/verified.html`
    );


    console.log("=============VERIFY EMAIL=======================");
    console.log(response);
    console.log("====================================");
  }

  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`, // sender address
    to: "support@shoprose.com ", // list of receivers
    subject: "User Details", // Subject line
    // text: "Hello ?", // plain text body
    html: `
    <html>
    <h2>Hello Chief,</h2>

    <p>A user just submitted his/her KYC details.</p>
    <p>Kindly check your dashboard to view details</p>

    <p>Best wishes,</p>
    <p>shoprose Team</p>

    </html>
    
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}





module.exports = {
  hashPassword,
  userRegisteration,
  sendUserDepositEmail,
  compareHashedPassword,
  sendDepositEmail,
  sendPlanEmail,
  sendUserPlanEmail,
  sendDepositApproval,
  sendPasswordOtp,
  sendForgotPasswordEmail,
  sendVerificationEmail,
  sendWithdrawalEmail,
  sendWithdrawalRequestEmail,
  sendWelcomeEmail,
  resendWelcomeEmail,
  resetEmail,
  sendKycAlert,
  sendUserDetails,
  sendOrderEmailToClient
};
