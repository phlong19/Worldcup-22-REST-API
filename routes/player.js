const express = require('express');
const { body, param, query } = require('express-validator');
const playerController = require('../controllers/player');

const router = express.Router();

router.get('/player', query('name').notEmpty(), playerController.getPlayer);

module.exports = router;
