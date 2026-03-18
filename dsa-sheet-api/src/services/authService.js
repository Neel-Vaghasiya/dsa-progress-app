const { User } = require('../models');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/tokenUtils');
const AppError = require('../utils/AppError');
const HTTP = require('../constants/httpStatus');

const register = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new AppError(HTTP.CONFLICT, 'EMAIL_EXISTS', 'An account with this email already exists');
  }

  const user = await User.create({ name, email, password });
  const tokens = await issueTokens(user);
  return { user, ...tokens };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !user.password) {
    throw new AppError(HTTP.UNAUTHORIZED, 'INVALID_CREDENTIALS', 'Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError(HTTP.UNAUTHORIZED, 'INVALID_CREDENTIALS', 'Invalid email or password');
  }

  const tokens = await issueTokens(user);
  return { user, ...tokens };
};

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError(HTTP.UNAUTHORIZED, 'UNAUTHORIZED', 'Refresh token required');
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    throw new AppError(HTTP.UNAUTHORIZED, 'UNAUTHORIZED', 'Invalid or expired refresh token');
  }

  const user = await User.findById(decoded.id).select('+refreshToken');
  if (!user || user.refreshToken !== refreshToken) {
    throw new AppError(HTTP.UNAUTHORIZED, 'UNAUTHORIZED', 'Refresh token revoked');
  }

  const tokens = await issueTokens(user);
  return { user, ...tokens };
};

const logout = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: '' });
};

const handleOAuthUser = async (user) => {
  const tokens = await issueTokens(user);
  return { user, ...tokens };
};

const issueTokens = async (user) => {
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

module.exports = { register, login, refresh, logout, handleOAuthUser };
