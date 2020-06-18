const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//unique doesn't actually cause any sort of validation but helps with performance
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("User", UserSchema);
