const controller = require('../controllers/users.controller');
const util = require('../util.js');

module.exports = (router) => {
  router.route('/users')
    .post(controller.add)
    .get(util.validateToken, controller.getAll);
    ;
  router.route('/login')
  .post(controller.login);
};
