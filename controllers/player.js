const { validationResult } = require('express-validator');
const Player = require('../models/player');
const Group = require('../models/group');

exports.getPlayer = async (req, res, next) => {
  const { id } = req.params;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const error = new Error('Invalid ID');
      error.statusCode = 422;
      throw error;
    }

    const data = await Player.findById(id).populate('team');
    if (!data) {
      return res.status(200).json({ message: 'Wrong ID' });
    }
    return res.status(200).json({
      message: 'Success',
      data: data,
    });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    next(error);
  }
};

exports.searchPlayer = async (req, res, next) => {
  const { name } = req.query;

  try {
    const data = await Player.find({
      player: { $regex: name, $options: 'i' },
    }).populate('team','-_id team rank points');
    if (data.length === 0) {
      return res.status(200).json({ message: "Can't find any players" });
    }
    return res.status(200).json({ message: 'Success', data: data });
  } catch (error) {
    next(error);
  }
};

exports.getGroups = async (req, res, next) => {
  try {
    const data = await Group.find().populate('team', '-_id rank team');
    if (!data) {
      const error = new Error('Something went wrong, please try again!');
      throw error;
    }
    return res.status(200).json({ message: 'Success', data: data });
  } catch (error) {
    next(error);
  }
};
