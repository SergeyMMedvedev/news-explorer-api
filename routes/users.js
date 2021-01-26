const router = require('express').Router();

const {
  login,
  createUser,
  getSelfInfo,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateUserBody, validateAuthentication } = require('../middlewares/validations');

router.post('/signin', validateAuthentication, login);

router.post('/signup', validateUserBody, createUser);

router.use(auth);

router.get('/users/me', getSelfInfo);

module.exports = router;
