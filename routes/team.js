const express = require('express');
const router = express.Router();

const { param, query } = require('express-validator');

const teamController = require('../controllers/team');

router.get(
  '/team/:id',
  param('id').trim().notEmpty().isMongoId(),
  teamController.getTeam
);

router.get('/team', query('team').trim().notEmpty(), teamController.searchTeam);

router.get('/rank', teamController.searchRank);

module.exports = router;
