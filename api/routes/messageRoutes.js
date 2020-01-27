let messageController = require('../controllers/messageController');

exports.route =  (app) => {
  app.route('/message/save').post(messageController.saveController);
  app.route('/message/all').get(messageController.allController);
};
