const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const authService = require('../services/authService');
const env = require('../config/env');
const HTTP = require('../constants/httpStatus');

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.clientUrl.startsWith('https'),
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const { user, accessToken, refreshToken } = await authService.register({ name, email, password });

  res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);
  res.status(HTTP.CREATED).json(success({ user, accessToken }, 'Registration successful'));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await authService.login({ email, password });

  res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);
  res.json(success({ user, accessToken }, 'Login successful'));
});

const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  const { user, accessToken, refreshToken } = await authService.refresh(token);

  res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);
  res.json(success({ user, accessToken }));
});

const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user._id);
  res.clearCookie('refreshToken', { path: '/' });
  res.json(success(null, 'Logged out'));
});

const me = asyncHandler(async (req, res) => {
  res.json(success({ user: req.user }));
});

const googleCallback = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken } = await authService.handleOAuthUser(req.user);

  res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);
  res.redirect(`${env.clientUrl}/auth/callback#token=${accessToken}`);
});

module.exports = { register, login, refresh, logout, me, googleCallback };
