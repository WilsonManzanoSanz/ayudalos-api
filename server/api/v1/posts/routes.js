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
  .get(controller.read)
  .put(authGuard.verifySameUser, controller.update)
  .delete(authGuard.verifySameUser, controller.delete);

module.exports = router;