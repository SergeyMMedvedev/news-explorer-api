const bcrypt = require('bcrypt');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');
const { getJwtToken } = require('../utils/jwt.js');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('email и password должны быть заполнены');
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = getJwtToken(user._id);
      res.status(200).send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  if (!email || !password || !name) {
    throw new BadRequestError('email, password и name должны быть заполнены');
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      throw new ConflictError('Пользователь с таким email уже существует');
    }
    bcrypt.hash(password, 10).then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((newUser) => {
          res.status(201).send({ message: `Пользователь email: ${newUser.email}, name:  ${newUser.name} успешно создан` });
        })
        .catch(next);
    });
  })
    .catch(next);
};

module.exports.getSelfInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.status(200).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};
