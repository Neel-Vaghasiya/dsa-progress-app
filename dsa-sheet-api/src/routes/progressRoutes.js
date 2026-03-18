const { Router } = require('express');
const { authenticate } = require('../middlewares/auth');
const progressController = require('../controllers/progressController');

const router = Router();

router.use(authenticate);

router.get('/stats', progressController.getStats);
router.get('/', progressController.getAllProgress);
router.patch('/:problemId', progressController.toggleProgress);

module.exports = router;
