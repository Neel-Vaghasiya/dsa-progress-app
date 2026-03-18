const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
const env = require('./config/env');
const routes = require('./routes');
const { error } = require('./utils/apiResponse');
const HTTP = require('./constants/httpStatus');

const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', routes);

app.use((_req, res) => {
  res.status(HTTP.NOT_FOUND).json(error('NOT_FOUND', 'Route not found'));
});

app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || HTTP.INTERNAL_SERVER;
  const code = err.code || 'INTERNAL_ERROR';
  const message =
    env.nodeEnv === 'production' && !err.isOperational
      ? 'Something went wrong'
      : err.message;

  if (env.nodeEnv !== 'test') {
    console.error(`[Error] ${code}: ${err.message}`);
    if (env.nodeEnv === 'development') console.error(err.stack);
  }

  res.status(statusCode).json(error(code, message));
});

module.exports = app;
