const bcrypt = require('bcrypt');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');
const { getJwtToken } = require('../utils/jwt.js');
const {
  requireEmaillPassword,
  requireEmaillPasswordName,
  userAlreadyExist,
  userNotFound,
  userCreated,
} = require('../utils/messeges');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError(requireEmaillPassword);
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
    throw new BadRequestError(requireEmaillPasswordName);
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      throw new ConflictError(userAlreadyExist);
    }
    bcrypt.hash(password, 10).then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then(() => {
          res.status(201).send({ message: userCreated });
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
        throw new NotFoundError(userNotFound);
      }
      return res.status(200).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};
