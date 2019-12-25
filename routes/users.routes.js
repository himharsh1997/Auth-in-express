const controller = require('../controllers/users.controller');

module.exports = (router) => {
  router.route('/users')
    .post(controller.add)
    .get(controller.getAll);
    ;
  router.route('/login')
  .post(controller.login);  
};
