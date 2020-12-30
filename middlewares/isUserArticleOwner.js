const BadRequesError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const Article = require('../models/article');

module.exports = (req, res, next) => {
  if (!/^[0-9a-f]{24}$/.test(req.params.id)) {
    throw new BadRequesError('Неверный id');
  }

  Article.findById(req.params.id).select('+owner').then((article) => {
    if (!article) {
      throw new NotFoundError('Нет статьи с таким id');
    }

    const userId = req.user._id.toString();
    const articleOwnerId = article.owner._id.toString();

    if (userId !== articleOwnerId) {
      throw new ForbiddenError('Вы не являетесь автором статьи');
    }

    return next();
  })
    .catch(next);
};
