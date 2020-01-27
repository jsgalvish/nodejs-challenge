let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let bcrypt = require('bcryptjs');

let User= new Schema({
  username:{
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

User.methods.comparePasswords = function(pass) {
  return bcrypt.compareSync(pass, this.hash_password);
};

exports = mongoose.model("User", User);
