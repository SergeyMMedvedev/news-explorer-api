const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const User = require('../models/user');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || (authorization && !authorization.startsWith('Bearer '))) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  return User.findById(payload._id).then((user) => {
    if (!user) {
      throw new UnauthorizedError('Пользователь был удален, необходимо зарегистрироваться заново');
    }
    req.user = payload;
    return next();
  }).catch(next);
};
