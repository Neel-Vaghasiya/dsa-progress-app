const { User } = require('../models');
const { verifyAccessToken } = require('../utils/tokenUtils');
const AppError = require('../utils/AppError');
const HTTP = require('../constants/httpStatus');

const authenticate = async (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return next(new AppError(HTTP.UNAUTHORIZED, 'UNAUTHORIZED', 'Access token required'));
  }

  try {
    const decoded = verifyAccessToken(header.split(' ')[1]);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError(HTTP.UNAUTHORIZED, 'UNAUTHORIZED', 'User no longer exists'));
    }
    req.user = user;
    next();
  } catch {
    return next(new AppError(HTTP.UNAUTHORIZED, 'UNAUTHORIZED', 'Invalid or expired access token'));
  }
};

const authorize = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new AppError(HTTP.FORBIDDEN, 'FORBIDDEN', 'Insufficient permissions'));
  }
  next();
};

module.exports = { authenticate, authorize };
