const router = require('express').Router();

const {
  createUser, getUsers, getUserById, updateProfileUser, updateAvatarUser,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.get('/me', getUserById)
router.patch('/me', updateProfileUser);
router.patch('/me/avatar', updateAvatarUser);

module.exports = router;
