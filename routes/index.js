const router = require('express').Router();

const usersRouter = require('./users');
const articlesRouter = require('./articles');
const auth = require('../middlewares/auth');
const { notFound } = require('../utils/messeges');

router.use(
  usersRouter,
  articlesRouter,
);
router.use('*', auth, (req, res) => {
  res.status(404).send({ message: notFound });
});

module.exports = router;
