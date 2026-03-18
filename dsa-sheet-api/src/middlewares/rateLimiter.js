const rateLimit = require('express-rate-limit');
const HTTP = require('../constants/httpStatus');
const { error } = require('../utils/apiResponse');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res
      .status(HTTP.TOO_MANY_REQUESTS)
      .json(error('RATE_LIMIT', 'Too many requests, please try again later'));
  },
});

module.exports = { authLimiter };
