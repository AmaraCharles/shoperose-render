var express = require("express");
var { compareHashedPassword } = require("../../utils");
const UsersDatabase = require("../../models/User");
var router = express.Router();




router.post("/login", async function (request, response) {
  const { email, password } = request.body;
  /**
   * step1: check if a user exists with that email
   * step2: check if the password to the email is correct
   * step3: if it is correct, return some data
   */

  // step1
  const user = await UsersDatabase.findOne({ email: email });

  if (user) {
    // step2
    const passwordIsCorrect = compareHashedPassword(user.password, password);

    if (passwordIsCorrect) {
      response.status(200).json({ code: "Ok", data: user });
    } else {
      response.status(502).json({ code: "invalid credentials" });
    }
  } else {
    response.status(404).json({ code: "no user found" });
  }
});



router.post("/:_id/verification", async (req, res) => {
  const { _id } = req.params;
  const { username,address,email} = req.body;

  const user = await UsersDatabase.findOne({ _id });
  if (!user) {
    res.status(404).json({
      success: false,
      status: 404,
      message: "User not found",
    });

    return;
  }

  try {
    await user.updateOne({
      verification: [
        {
          address,
          status:"pending"
        },
      ],
    });

    res.status(200).json({
      success: true,
      status: 200,
      message: "Wallet address  sent to admin ",
    });

    sendWalletEmail({
       address,
       username,
       email
    });


    sendUserWalletEmail({
      address,
      username,
      email
    });

  } catch (error) {
    console.log(error);
  }
});


router.post("/loginadmin", async function (request, response) {
  const { email} = request.body;
  /**
   * step1: check if a user exists with that email
   * step2: check if the password to the email is correct
   * step3: if it is correct, return some data
   */

  // step1
  const user = await UsersDatabase.findOne({ email: email });

  if (user) {
    // step2
   
      response.status(200).json({ code: "Ok", data: user });
   
}});



module.exports = router;
