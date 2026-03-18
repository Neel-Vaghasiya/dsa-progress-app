const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const topicService = require('../services/topicService');

const getTopics = asyncHandler(async (_req, res) => {
  const topics = await topicService.getTopics();
  res.json(success(topics));
});

const getTopicBySlug = asyncHandler(async (req, res) => {
  const topic = await topicService.getTopicBySlug(req.params.slug);
  res.json(success(topic));
});

module.exports = { getTopics, getTopicBySlug };
