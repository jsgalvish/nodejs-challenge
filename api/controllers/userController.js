let users = [{username: 'bot', password: '[{pq}]'}]

exports.loginController = (req, res) => {
  if(req.body.username == users[0].username && req.body.password == users[0].password){
    res.json({status: 'success'})
  } else{
    res.json({status:'error'})
  }
}
