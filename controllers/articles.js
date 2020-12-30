const Article = require('../models/article');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
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
    throw new BadRequestError('все поля должны быть заполнены');
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
  }).then((article) => {
    res.status(201).send({ message: `статья ${article.title} успешно создана` });
  })
    .catch(next);
};

module.exports.deleteAtricle = (req, res, next) => {
  const { id } = req.params;
  Article.findByIdAndRemove(id)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Нет статьи с таким id');
      }
      return res.status(200).send(article);
    })
    .catch(next);
};
