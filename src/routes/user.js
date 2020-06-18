const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//@route POST api/users/signup

router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }
  User.findOne({ email })
    .then(user => {
      if (user) res.status(400).json({ message: "User already exists" });

      const newUser = new User({
        username,
        email,
        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                "secret",
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    token,
                    id: user.id
                  });
                }
              );
            })
            .catch(err => res.status(404).json({ error: err }));
        });
      });
    })
    .catch();
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }
  User.findOne({ email }).then(user => {
    if (!user) res.status(400).json({ message: "User doesn't exist" });

    //validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });
      jwt.sign({ id: user.id }, "secret", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({
          token,
          id: user.id,
          email: user.email
        });
      });
    });
  });
});

module.exports = router;
