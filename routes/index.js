const router = require('express').Router();

const usersRouter = require('./users');
const articlesRouter = require('./articles');

router.use(
  usersRouter,
  articlesRouter,
);

module.exports = router;
