let mongoose = require("mongoose");

let users= [{username:'bot',hash_password:'[{pq}]'}]

let User = mongoose.model("User");

let bcrypt = require('bcryptjs');

//let User = require('../models/userModel')

exports.registerController = (req, res) =>{
  let newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password);

  User.findOne({ email: req.body.email}, (err, users) => {
      if (err) {
        return res.status(401).json({ status: "error", message: err });
      } else {
        if (!users) {
          newUser.hash_password = bcrypt.hashSync(req.body.password);
          newUser.save((err, user) => {
            if (err) return res.json({ status: "error", message: err });
            user.hash_password = undefined;
            return res.json({
              status: "success",
              user: user,
              message: "User Registered Successfully!"
            });
          });
        } else {
          return res.json({
            status: "error",
            message: "User Already Exists, Please Login!"
          });
        }
      }
    }
  );
};

exports.loginController = (req, res) => {

  User.findOne({ email: req.body.email }, (err, user) =>{
    if(err){
      return res.status(401).json({ status: 'error', message: err})
    }

    if(user.hash_password === req.body.password){
      return res.json({ status: 'success', user: user})
    } else {
      return res.status(401).json({ status: 'error', message: 'Wrong Credentials'})
    }
  });

  if(req.body.username === users[0].username && req.body.password === users[0].password){
    res.json({status: 'success'})
  } else{
    res.json({status:'error', msg: "Username and/ or Password Error"})
  }
}
