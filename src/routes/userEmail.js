const express = require("express");
const router = express.Router();
const auth = require("../auth-middleware/check-auth");
const nodemailer = require("nodemailer");
router.post("/", (req, res, next) => {
  //this is the email to send the email to!
  const { email } = req.body.data.source;
  const mailOptions = {
    from: "kelarcrisp@gmail.com",
    to: email,
    subject: "your fake Kawffee",
    text: "dont worry you wont be charged -------- test"
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kelarcrisp@gmail.com",
      pass: process.env.GOOGLE
    }
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info.response);
    }
  });

  console.log(req.body);
  try {
    res.status(200).json({
      message: "user email",
      data: email
    });
  } catch (err) {
    res.status(404).json({
      error: err
    });
  }
});

module.exports = router;
