const router = require('express').Router();
const users = require('./users/routes');
const posts = require('./posts/routes');
const posts_user = require('./posts-user/relations');
const typeUsers= require('./type-users/routes');
const typeDonations = require('./type-donations/routes');
const typeDestination = require('./type-destinations/routes');
const commentPost = require('./posts-comments/routes');
const typeComment = require('./type-comments/routes');
const parentComment = require('./parent-comments/routes');
const categoryDonations = require('./category-donations/routes');
const states = require('./states/routes');


router.use('/users', users);
router.use('/posts', posts);
router.use('/type-users', typeUsers);
router.use('/type-donations', typeDonations);
router.use('/type-destinations', typeDestination);
router.use('/posts-comments', commentPost);
router.use('/type-comments', typeComment);
router.use('/parent-comments', parentComment);
router.use('/category-donations', categoryDonations);
router.use('/states', states);

module.exports = router;
