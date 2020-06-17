const mongoose = require("mongoose");

//unique doesn't actually cause any sort of validation but helps with performance
const userCartSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  BrandName: { type: String },
  Image: { type: String },
  LongDesc: { type: String },
  Path: { type: String },
  Product: { type: String },
  SalePrice: { type: String },
  ShortDesc: { type: String },
  UPC: { type: String },
  UPCInfo: { type: String },
  checkoutId: { type: String }
});

module.exports = mongoose.model("UserCart", userCartSchema);
