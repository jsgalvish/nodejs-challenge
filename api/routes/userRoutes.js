let userController = require('../controllers/userController');

exports.route =  (app) => {
  app.route('/user/login').post(userController.loginController)
};
