const { Topic, Problem } = require('../models');
const AppError = require('../utils/AppError');
const HTTP = require('../constants/httpStatus');

const getTopics = async () => {
  const topics = await Topic.aggregate([
    { $sort: { order: 1 } },
    {
      $lookup: {
        from: 'problems',
        localField: '_id',
        foreignField: 'topicId',
        as: 'problems',
      },
    },
    {
      $project: {
        name: 1,
        slug: 1,
        description: 1,
        order: 1,
        problemCount: { $size: '$problems' },
      },
    },
  ]);

  return topics;
};

const getTopicBySlug = async (slug) => {
  const topic = await Topic.findOne({ slug });
  if (!topic) {
    throw new AppError(HTTP.NOT_FOUND, 'NOT_FOUND', 'Topic not found');
  }
  return topic;
};

module.exports = { getTopics, getTopicBySlug };
