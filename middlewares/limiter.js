const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: {
    message: 'Превышен лимит запросов. Попробуйте повторить позже.',
  }
});

module.exports = limiter;
