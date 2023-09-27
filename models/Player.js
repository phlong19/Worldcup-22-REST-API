const mongoose = require('mongoose');
const playerSchema = new mongoose.Schema(
  {
    name: String,
    team: String,
    position: String,
    age: Number,
    caps: Number,
    goals: Number,
    wcGoals: Number,
    league: String,
    club: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Player', playerSchema);
