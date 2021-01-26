const BadRequesError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const Article = require('../models/article');
const { userNotOwner, articleNotFound, incorrectId } = require('../utils/messeges');

module.exports = (req, res, next) => {
  if (!/^[0-9a-f]{24}$/.test(req.params.id)) {
    throw new BadRequesError(incorrectId);
  }

  Article.findById(req.params.id).select('+owner').then((article) => {
    if (!article) {
      throw new NotFoundError(articleNotFound);
    }

    const userId = req.user._id.toString();
    const articleOwnerId = article.owner._id.toString();

    if (userId !== articleOwnerId) {
      throw new ForbiddenError(userNotOwner);
    }

    return next();
  })
    .catch(next);
};
