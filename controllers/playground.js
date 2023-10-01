const Playground = require('../models/playground');

const { validationResult } = require('express-validator');

exports.getMatch = async (req, res, next) => {
  const { id } = req.params;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const error = new Error('Invalid match ID');
      error.statusCode = 422;
      throw error;
    }

    const data = await Playground.findById(id)
      .populate('homeTeam')
      .populate('awayTeam');
    if (!data) {
      return res.status(200).json({ message: "Can't find any match." });
    }
    return res.status(200).json({ message: 'Success', data: data });
  } catch (error) {
    next(error);
  }
};

exports.postMatch = async (req, res, next) => {
  const {
    year,
    date,
    stage,
    homeTeam,
    homeGoals,
    awayGoals,
    awayTeam,
    winConditions = '',
  } = req.body;

  const errors = validationResult(req);

  const match = new Playground({
    year: year,
    date: date,
    stage: stage,
    homeTeam: homeTeam,
    homeGoals: homeGoals,
    awayGoals: awayGoals,
    awayTeam: awayTeam,
    winConditions: winConditions,
  });

  try {
    if (!errors.isEmpty()) {
      //   console.log(errors.array());
      const error = new Error('Invalid match inputs');
      error.statusCode = 422;
      throw error;
    }

    await match.save();
    return res
      .status(201)
      .json({ message: 'Success create a new match', data: match });
  } catch (error) {
    next(error);
  }
};

exports.updateMatch = async (req, res, next) => {
  const { id } = req.params;
  const {
    year,
    date,
    stage,
    homeTeam,
    homeGoals,
    awayGoals,
    awayTeam,
    winConditions = '',
  } = req.body;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const error = new Error('Invalid match ID');
      error.statusCode = 422;
      throw error;
    }

    const match = await Playground.findById(id);
    if (!match) {
      return res
        .status(200)
        .json({ message: "Can't find any match to update." });
    }
    match.year = year;
    match.date = date;
    match.stage = stage;
    match.homeTeam = homeTeam;
    match.homeGoals = homeGoals;
    match.awayGoals = awayGoals;
    match.awayTeam = awayTeam;
    match.winConditions = winConditions;

    await match.save();
    return res
      .status(200)
      .json({ message: 'Match updated by PUT successfully', data: match });
  } catch (error) {
    next(error);
  }
};

exports.patchMatch = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const error = new Error('Invalid match ID');
      error.statusCode = 422;
      throw error;
    }
    const match = await Playground.findById(id);
    if (!match) {
      return res
        .status(200)
        .json({ message: "Can't find any match to update." });
    }
    match.set(updates);
    const updatedMatch = await match.save();
    return res
      .status(201)
      .json({
        message: 'Updated match with PATCH successfully',
        data: updatedMatch,
      });
  } catch (error) {
    next(error);
  }
};

exports.deleteMatch = async (req, res, next) => {
  const id = req.params.id;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error('Invalid match ID');
      error.statusCode = 422;
      throw error;
    }
    const data = await Playground.findOne({ _id: id });
    if (!data) {
      return res
        .status(200)
        .json({ message: "Can't find any match to delete" });
    }
    await data.deleteOne();
    return res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};
