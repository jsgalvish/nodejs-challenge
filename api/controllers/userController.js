let mongoose = require("mongoose");
let User = mongoose.model("User");
let bcrypt = require('bcryptjs');


exports.registerController = (req, res) => {
  let newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password);

  User.findOne({ username: req.body.username}, (err, users) => {
      if (err) {
        return res.status(401).json({ status: "error", message: err });
      } else {
        if (!users) {
          newUser.hash_password = bcrypt.hashSync(req.body.password);
          newUser.save((err, user) => {
            if (err) {return res.json({ status: "error", message: err });}
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

  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return res.json({status: 'error', message: 'err'})
    } else if (user) {
      if (user.comparePasswords(req.body.password)) {
        return res.json({status: 'success', user: user})
      }
    }
    return res.json({status: 'error', message: 'Wrong Credentials Are Wrong!'})
  })
};
