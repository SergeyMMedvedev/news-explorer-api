const Article = require('../models/article');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const { requireAllFields, articleNotFound, articleCreated } = require('../utils/messeges');

module.exports.getArticles = (req, res, next) => {
  console.log('getArticles');
  Article.find({ owner: req.user._id })
  .then((articles) => {
      res.send(articles.reverse());
    })
    .catch(next);
};

module.exports.postArticles = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  const owner = req.user._id;
  if (!keyword || !title || !text || !date || !source || !link || !image || !owner) {
    throw new BadRequestError(requireAllFields);
  }
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  }).then(() => {
    res.status(201).send({ message: articleCreated });
  })
    .catch(next);
};

module.exports.deleteAtricle = (req, res, next) => {
  const { id } = req.params;
  Article.findByIdAndRemove(id)
    .then((article) => {
      if (!article) {
        throw new NotFoundError(articleNotFound);
      }
      return res.status(200).send(article);
    })
    .catch(next);
};
