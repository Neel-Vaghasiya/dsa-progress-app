const { UserProgress, Topic, Problem } = require('../models');
const AppError = require('../utils/AppError');
const HTTP = require('../constants/httpStatus');

const getAllProgress = async (userId) => {
  const records = await UserProgress.find({ userId })
    .select('problemId isSolved solvedAt -_id')
    .lean();
  return records;
};

const toggleProgress = async (userId, problemId) => {
  const problem = await Problem.findById(problemId);
  if (!problem) {
    throw new AppError(HTTP.NOT_FOUND, 'NOT_FOUND', 'Problem not found');
  }

  const existing = await UserProgress.findOne({ userId, problemId });
  const newSolvedState = !(existing?.isSolved ?? false);

  const record = await UserProgress.findOneAndUpdate(
    { userId, problemId },
    {
      isSolved: newSolvedState,
      solvedAt: newSolvedState ? new Date() : null,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return record;
};

const getStats = async (userId) => {
  const [overall] = await UserProgress.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        solved: { $sum: { $cond: ['$isSolved', 1, 0] } },
      },
    },
  ]);

  // Per-topic: join problems → group by topicId
  const topicStats = await UserProgress.aggregate([
    { $match: { userId } },
    {
      $lookup: {
        from: 'problems',
        localField: 'problemId',
        foreignField: '_id',
        as: 'problem',
      },
    },
    { $unwind: '$problem' },
    {
      $group: {
        _id: '$problem.topicId',
        solved: { $sum: { $cond: ['$isSolved', 1, 0] } },
      },
    },
    {
      $lookup: {
        from: 'topics',
        localField: '_id',
        foreignField: '_id',
        as: 'topic',
      },
    },
    { $unwind: '$topic' },
    {
      $project: {
        _id: 0,
        topicId: '$_id',
        topicName: '$topic.name',
        topicSlug: '$topic.slug',
        solved: 1,
      },
    },
    { $sort: { topicName: 1 } },
  ]);

  return {
    total: overall?.total ?? 0,
    solved: overall?.solved ?? 0,
    topicWise: topicStats,
  };
};

module.exports = { getAllProgress, toggleProgress, getStats };
