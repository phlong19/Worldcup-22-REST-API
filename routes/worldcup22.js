const express = require('express');
const { param, query } = require('express-validator');
const wc22Controller = require('../controllers/player');

const router = express.Router();

router.get('/player/:id', wc22Controller.getPlayer);

router.get('/player', query('name').notEmpty(), wc22Controller.searchPlayer);

router.get('/groups', wc22Controller.getGroups);

module.exports = router;
