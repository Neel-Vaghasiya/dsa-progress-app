const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const progressService = require('../services/progressService');

const getAllProgress = asyncHandler(async (req, res) => {
  const records = await progressService.getAllProgress(req.user._id);
  res.json(success(records));
});

const toggleProgress = asyncHandler(async (req, res) => {
  const record = await progressService.toggleProgress(
    req.user._id,
    req.params.problemId
  );
  res.json(success(record));
});

const getStats = asyncHandler(async (req, res) => {
  const stats = await progressService.getStats(req.user._id);
  res.json(success(stats));
});

module.exports = { getAllProgress, toggleProgress, getStats };
