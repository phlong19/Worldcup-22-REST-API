const express = require('express');

const router = express.Router();
const playgroundController = require('../controllers/playground');

const { body, param, query } = require('express-validator');

const check = [
  body('year').notEmpty().isNumeric(),
  body('date').notEmpty().isDate(),
  body('stage').notEmpty().trim().isString(),
  body('homeTeam').notEmpty().isMongoId(),
  body('awayTeam').notEmpty().isMongoId(),
  body('homeGoals').notEmpty().isNumeric(),
  body('awayGoals').notEmpty().isNumeric(),
];

router.get(
  '/:id',
  param('id').notEmpty().isMongoId(),
  playgroundController.getMatch
);

router.post('/new-match', check, playgroundController.postMatch);

router.put(
  '/:id',
  param('id').notEmpty().isMongoId(),
  check,
  playgroundController.updateMatch
);

router.patch(
  '/:id',
  param('id').notEmpty().isMongoId(),
  playgroundController.patchMatch
);

router.delete(
  '/:id',
  param('id').notEmpty().isMongoId(),
  playgroundController.deleteMatch
);

module.exports = router;
