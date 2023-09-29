const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const matchSchema = new Schema({
  year: Number,
  date: {
    type: Date,
    required: true,
  },
  stage: String,
  homeTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  homeGoals: Number,
  awayGoals: Number,
  awayTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
});

module.exports = mongoose.model('worldcupMatches', matchSchema);
