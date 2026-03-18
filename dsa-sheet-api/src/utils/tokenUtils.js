const jwt = require('jsonwebtoken');
const env = require('../config/env');

const generateAccessToken = (userId) =>
  jwt.sign({ id: userId }, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessExpiry,
  });

const generateRefreshToken = (userId) =>
  jwt.sign({ id: userId }, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpiry,
  });

const verifyAccessToken = (token) =>
  jwt.verify(token, env.jwt.accessSecret);

const verifyRefreshToken = (token) =>
  jwt.verify(token, env.jwt.refreshSecret);

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
