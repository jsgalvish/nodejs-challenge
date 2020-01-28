let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Message= new Schema({
  username:{
    type: String,
    trim: true,
    required: true
  },
  msg: {
    type: String,
    required: true
  },
  room:{
    type: String,
    require: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

exports = mongoose.model("Message", Message);
