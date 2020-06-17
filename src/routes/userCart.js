const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const UserCart = require("../models/userCart");
router.post("/", (req, res, next) => {
  const userCart = new UserCart({
    _id: new mongoose.Types.ObjectId(),
    BrandName: req.body.BrandName,
    Image: req.body.Image,
    LongDesc: req.body.LongDesc,
    Path: req.body.Path,
    Product: req.body.Product,
    SalePrice: req.body.SalePrice,
    ShortDesc: req.body.ShortDesc,
    UPC: req.body.UPC,
    UPCInfo: req.body.UPCInfo,
    checkoutId: req.body.checkoutId
  });
  userCart.save().then(result => {
    res.status(201).json({
      message: "product added to checkout",
      data: result
    });
  });
});

router.get("/", (req, res, next) => {
  UserCart.find()
    .exec()
    .then(result => {
      res.status(200).json({
        message: "all checkout products",
        data: result
      });
    })
    .catch(err => {
      res.status(404).json({ error: err });
    });
});

module.exports = router;
