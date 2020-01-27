let userController = require('../controllers/userController');

exports.route =  (app) => {
  app.route('/user/login').post(userController.loginController);
  app.route('/user/register').post(userController.registerController);
};
