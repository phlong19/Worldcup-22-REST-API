const { validationResult } = require('express-validator');
const Player = require('../models/Player');

exports.getPlayer = async (req, res, next) => {
  const {name} = req.query;

  // validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('player information is wrong ');
    error.statusCode = 422;
    throw error;
  }

  // query
  try {
    const player = await Player.find({ name: { $regex: name } });
    
    return res.status(200).json({
      data: player,
      message: 'success',
    });
  } catch (error) {
    return next(error);
  }
};
