const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const getJwtToken = (_id) => (
  jwt.sign(
    { _id },
    NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
    { expiresIn: '7d' },
  )
);

module.exports = {
  getJwtToken,
};
