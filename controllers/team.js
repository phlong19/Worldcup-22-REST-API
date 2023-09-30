const Team = require('../models/team');
const { validationResult } = require('express-validator');

exports.getTeam = async (req, res, next) => {
  try {
    const { id } = req.params;
    let message;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Invalid Team ID');
      error.statusCode = 422;
      throw error;
    }

    const data = await Team.findById(id);
    if (!data) {
      message = "Couldn't find any contents.";
    }

    res.status(200).json({ message: message, data: data });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    next(error);
  }
};

exports.searchTeam = async (req, res, next) => {
  const { team } = req.query;
  const errors = validationResult(req);

  try {
    // check validation error
    if (!errors.isEmpty()) {
      const error = new Error('Invalid search query');
      error.statusCode = 422;
      throw error;
    }

    // query
    const data = await Team.find({ team: { $regex: team, $options: 'i' } });
    if (data.length === 0) {
      return res.status(200).json({ message: 'None results were found.' });
    }

    return res.status(200).json({ message: message, data: data });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    next(error);
  }
};

exports.searchRank = async (req, res, next) => {
  const { rank, rankHigherThan = 0, rankLowerThan = 1000 } = req.query;
  let query = { rank: rank };

  try {
    if (!rank) {
      query = {      
        rank: { $gt: rankHigherThan, $lt: rankLowerThan },
      };
    }
    const data = await Team.find(query);

    return res.status(200).json({ message: 'Success', data: data });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    next(error);
  }
};
