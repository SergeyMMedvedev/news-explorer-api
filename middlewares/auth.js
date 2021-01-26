const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const User = require('../models/user');
require('dotenv').config();

const { JWT_SECRET } = require('../utils/jwt');
const { userNotAuth, userWasDeleted } = require('../utils/messeges');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || (authorization && !authorization.startsWith('Bearer '))) {
    throw new UnauthorizedError(userNotAuth);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError(userNotAuth);
  }

  return User.findById(payload._id).then((user) => {
    if (!user) {
      throw new UnauthorizedError(userWasDeleted);
    }
    req.user = payload;
    return next();
  }).catch(next);
};
