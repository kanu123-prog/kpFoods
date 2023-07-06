const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
const { default: userEvent } = require("@testing-library/user-event");
const secret = "thisisascecretauthtoken";
// const { query, validationResult } = require("express-validator");
router.post(
  "/createuser",

  // query('name').notEmpty(),
  // query("name").isLength({ min: 10 }),
  // query("email").isEmail(),
  // query("password","invali pass").isLength({ min: 5 }),

  async (req, res) => {
    // const result = validationResult(req);
    // if (!result.isEmpty()) {
    //   return res.status(400).json({ errors: result.array() });
    // }
    const salt = await bcrypt.genSalt(10);
    const securedPass = await bcrypt.hash(req.body.password,salt);
    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: securedPass,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post("/loginuser", async (req, res) => {
  try {
    let userData = await User.findOne({email : req.body.email});
    if (!userData) {
      return res
        .status(400)
        .json({ errors: "Login with valid credentials, please!" });
    }
    const pwdCompare = await bcrypt.compare(req.body.password,userData.password )
    if (!pwdCompare) {
      return res.status(400).json({ errors: "Login with valid password, please!" });
    }
    const data={
      user:{
        id:userData.id
      }
    }
    const authToken = jwt.sign(data,secret);
    return res.json({ success: true , authToken : authToken});
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});


// router.post("/loginuser", async (req, res) => {
//   let userEmail = req.body.email;
//   try {
//     let userData = await User.find({ userEmail });
//     if (!userData) {
//       return res
//         .status(400)
//         .json({ errors: "login with valid credentials pls!" });
//     }
//     if (userData.password !== req.body.password) {
//       console.log(userData)
//       console.log(req.body.password);
//       console.log(userData.password);
//       return res.status(400).json({ errors: "login with valid password pls!" });
//     }
//     return res.json({ success: true });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false });
//   }
// });

module.exports = router;
