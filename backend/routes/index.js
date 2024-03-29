const router = require('express').Router();
const auth = require('../middlewares/auth');
const RoutesUsers = require('./users');
const RoutesWord = require('./word');
const {
  login,
  createUsers,
  clearCookie,
} = require('../controllers/app');
const {
  validationSignUp,
  validationSignIn,
} = require('../validation/validation');
const { NotFoundError } = require('../errors/NotFoundError');

router.post('/signin', validationSignIn, login);
router.post('/signup', validationSignUp, createUsers);
router.use(auth);
router.post('/signout', clearCookie);
router.use('/', RoutesUsers);
router.use('/', RoutesWord);
router.use((req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

module.exports = router;
