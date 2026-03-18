const { Router } = require('express');
const problemController = require('../controllers/problemController');

const router = Router();

router.get('/:id', problemController.getProblemById);

module.exports = router;
