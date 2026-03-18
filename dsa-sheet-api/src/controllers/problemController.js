const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const problemService = require('../services/problemService');

const getProblemsByTopic = asyncHandler(async (req, res) => {
  const problems = await problemService.getProblemsByTopic(req.params.slug);
  res.json(success(problems));
});

const getProblemById = asyncHandler(async (req, res) => {
  const problem = await problemService.getProblemById(req.params.id);
  res.json(success(problem));
});

module.exports = { getProblemsByTopic, getProblemById };
