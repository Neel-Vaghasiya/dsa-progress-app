const { Router } = require('express');
const topicController = require('../controllers/topicController');
const problemController = require('../controllers/problemController');

const router = Router();

router.get('/', topicController.getTopics);
router.get('/:slug', topicController.getTopicBySlug);
router.get('/:slug/problems', problemController.getProblemsByTopic);

module.exports = router;
