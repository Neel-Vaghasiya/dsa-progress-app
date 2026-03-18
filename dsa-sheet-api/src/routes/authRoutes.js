const { Router } = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth');
const { registerRules, loginRules } = require('../middlewares/validate');
const { authLimiter } = require('../middlewares/rateLimiter');

const router = Router();

router.use(authLimiter);

router.post('/register', registerRules, authController.register);
router.post('/login', loginRules, authController.login);

router.post('/refresh', authController.refresh);
router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.me);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/api/auth/google' }),
  authController.googleCallback
);

module.exports = router;
