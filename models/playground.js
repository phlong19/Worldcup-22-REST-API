const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  stage: { type: String, required: true },
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
  winConditions: String,
});

module.exports = mongoose.model('Playground', matchSchema);
