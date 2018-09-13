const router = require('express').Router({
  mergeParams: true,
});
const controller = require('./controller');
const authGuard = require('../../../auth/auth');

router
  .param('id', controller.id);

router.route('/')
  .get(controller.all)
  .post(controller.create);

router.route('/:id')
  .get(authGuard.verifyToken, controller.read)
  .put( controller.update)
  .delete(authGuard.verifySameUser, controller.delete);

module.exports = router;