const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  position: String,
  player: String,
  age: Number,
  caps: Number, // total matches for international team
  goals: Number, // total goals
  wcGoals: Number, // just wc 22 goals
  league: String, // just the country's name held the leage
  club: String,
});

module.exports = mongoose.model('worldcup22Players', playerSchema);
