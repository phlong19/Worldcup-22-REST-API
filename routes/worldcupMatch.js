const express = require('express');
const router = express.Router();

const { param } = require('express-validator');

const wcController = require('../controllers/worldcupMatch');

router.get('/all', wcController.getMatches);

router.get('/', wcController.searchMatchesByDate);

router.get(
  '/year/:year',
  param('year').notEmpty().isNumeric(),
  wcController.getMatchesByYear
);

module.exports = router;
