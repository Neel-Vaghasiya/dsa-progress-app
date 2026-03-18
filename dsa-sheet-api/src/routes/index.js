const { Router } = require('express');
const authRoutes = require('./authRoutes');
const topicRoutes = require('./topicRoutes');
const problemRoutes = require('./problemRoutes');
const progressRoutes = require('./progressRoutes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/topics', topicRoutes);
router.use('/problems', problemRoutes);
router.use('/progress', progressRoutes);

module.exports = router;
