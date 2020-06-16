const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res, next) => {
  console.log("hit the endpoint");
  //validating on email instead of username
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "email already exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              email: req.body.email,
              password: hash
            });
            console.log(user);
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: "user created"
                });
              })
              .catch(err =>
                res.status(500).json({
                  error: err
                })
              );
          }
        });
      }
    });

  router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        console.log(user, "result");
        if (user.length < 1) {
          return res.status(401).json({
            message: "auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              "any name here",
              {
                expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth Success",
              token: token
            });
          }
          return res.status(401).json({
            message: "auth failed"
          });
        });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });

  /* if I ever want to allow the user to delete their profile*/
  //   router.delete("/:userId", (req, res, next) => {
  //     User.remove({ _id: req.params.userId })
  //       .exec()
  //       .then(result => {
  //         res.status(200).json({ message: "user deleted" });
  //       })
  //       .catch(err => res.status(200).json({ error: err }));
  //   });
});

module.exports = router;
