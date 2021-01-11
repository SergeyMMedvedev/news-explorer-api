const router = require('express').Router();
const isUserArticleOwner = require('../middlewares/is-user-article-owner');

const {
  getArticles,
  postArticles,
  deleteAtricle,
} = require('../controllers/articles');
const auth = require('../middlewares/auth');
const { validateObjId, validateArticleBody } = require('../middlewares/validations');

router.use(auth);

router.get('/articles', getArticles);

router.post('/articles', validateArticleBody, postArticles);

router.delete('/articles/:id', validateObjId, isUserArticleOwner, deleteAtricle);

module.exports = router;
