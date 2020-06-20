const express = require("express");
const router = express.Router();
const auth = require("../auth-middleware/check-auth");
const nodemailer = require("nodemailer");
router.post("/", (req, res, next) => {
  //this is the email to send the email to!
  const { email } = req.body.data.source;

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
