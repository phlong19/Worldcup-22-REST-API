const express = require('express');
const router = express.Router();

const intController = require('../controllers/internationalMatch');

router.get('/all', intController.getMatches);

router.get('/', intController.searchMatchesByDate);

module.exports = router;
