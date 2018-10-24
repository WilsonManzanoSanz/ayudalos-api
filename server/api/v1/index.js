const router = require('express').Router();
const users = require('./users/routes');
const posts = require('./posts/routes');
const petitions = require('./petitions/routes');
const posts_user = require('./posts-user/relations');
const typeUsers = require('./type-users/routes');
const typeDonations = require('./type-donations/routes');
const typePetitions = require('./type-petitions/routes');
const typeDestinations = require('./type-destinations/routes');
const commentPosts = require('./posts-comments/routes');
const commentPetitions = require('./petitions-comments/routes');
const typeComments = require('./type-comments/routes');
const parentComments = require('./parent-comments/routes');
const categoryDonations = require('./category-donations/routes');
const states = require('./states/routes');


router.use('/users', users);
router.use('/posts', posts);
router.use('/petitions', petitions);
//router.use('/type-users', typeUsers);
//router.use('/type-donations', typeDonations);
//router.use('/type-destinations', typeDestinations);
//router.use('/type-petitions', typePetitions);
router.use('/posts-comments', commentPosts);
router.use('/petitions-comments', commentPetitions);
//router.use('/type-comments', typeComments);
router.use('/parent-comments', parentComments);
//router.use('/category-donations', categoryDonations);
//router.use('/states', states);

module.exports = router;
