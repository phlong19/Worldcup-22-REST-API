const InternationalMatch = require('../models/internationalMatch');

exports.getMatch = async (req, res, next) => {
  try {
    const data = await InternationalMatch.findOne()
      .populate('homeTeam')
      .populate('awayTeam');
    return res.status(200).json({ data: data, message: 'ok' });
  } catch (error) {
    next(error);
  }
};
