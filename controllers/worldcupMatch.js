const { validationResult } = require('express-validator');
const WorldCupMatch = require('../models/worldcupMatch');

const RECORDS_PER_REQUEST = 100;

exports.getMatches = async (req, res, next) => {
  const { page = 1 } = req.query;

  try {
    const data = await WorldCupMatch.find()
      .skip((page - 1) * RECORDS_PER_REQUEST)
      .limit(RECORDS_PER_REQUEST)
      .populate('homeTeam', '-_id rank team points')
      .populate('awayTeam', '-_id rank team points');
    return res.status(200).json({ message: 'Success', data: data });
  } catch (error) {
    next(error);
  }
};

exports.searchMatchesByDate = async (req, res, next) => {
  const {
    date,
    dateHigherThan = '1850-01-01',
    dateLowerThan = '2049-01-01',
    page = 1,
  } = req.query;

  let query = { date: date };

  try {
    if (!date) {
      query = { date: { $gt: dateHigherThan, $lt: dateLowerThan } };
    }
    // total records
    const counted = await WorldCupMatch.countDocuments(query);

    // get 100
    const data = await WorldCupMatch.find(query)
      .skip((page - 1) * RECORDS_PER_REQUEST)
      .limit(RECORDS_PER_REQUEST)
      .populate('homeTeam', '-_id rank team points')
      .populate('awayTeam', '-_id rank team points');
    if (!data || data.length === 0) {
      return res.status(200).json({ message: "Can't find any matches" });
    }
    return res.status(200).json({
      page: +page,
      totalDocs: counted,
      message: 'Success',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMatchesByYear = async (req, res, next) => {
  const { year } = req.params;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const error = new Error('Invalid World Cup year');
      error.statusCode = 422;
      throw error;
    }

    const data = await WorldCupMatch.find({ year: year })
      .populate('homeTeam', '-_id rank team points')
      .populate('awayTeam', '-_id rank team points');
    if (data.length === 0) {
      return res.status(200).json({ message: "Can't find any matches" });
    }
    return res.status(200).json({
      message: 'Success',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
