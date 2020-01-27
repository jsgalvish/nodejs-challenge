let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let User= new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  username:{
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  hash_password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

exports = mongoose.model("User", User);
