const { Problem, Topic } = require('../models');
const AppError = require('../utils/AppError');
const HTTP = require('../constants/httpStatus');

const getProblemsByTopic = async (topicSlug) => {
  const topic = await Topic.findOne({ slug: topicSlug });
  if (!topic) {
    throw new AppError(HTTP.NOT_FOUND, 'NOT_FOUND', 'Topic not found');
  }

  const problems = await Problem.find({ topicId: topic._id })
    .sort({ order: 1 })
    .select('-__v');

  return problems;
};

const getProblemById = async (problemId) => {
  const problem = await Problem.findById(problemId).select('-__v');
  if (!problem) {
    throw new AppError(HTTP.NOT_FOUND, 'NOT_FOUND', 'Problem not found');
  }
  return problem;
};

module.exports = { getProblemsByTopic, getProblemById };
