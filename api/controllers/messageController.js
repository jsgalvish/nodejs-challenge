let mongoose = require("mongoose");
let Message = mongoose.model("Message");

exports.saveController = (req, res) =>{
  let newMessage = new Message(req.body);

  newMessage.save((err, message) => {
    if (err) {return res.json({ status: "error", message: err });}

    return res.json({
      status: "success",
      msg: message
    });
  });
};

exports.allController = (req,res) => {
  Message.find({room: req.query.room},{ msg: 1 , username: 1 }, (err, messages)=>{
    if (err) {
      return res.status(401).json({ status: "error", message: err });
    } else {
      return res.json({
        status: "success",
        messages: messages
      });
    }
  }).limit( Message.estimatedDocumentCount() - 50)
};
