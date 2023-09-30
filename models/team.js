const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
  rank: Number,
  team: {
    type: String,
    required: true,
  },
  squadSize: Number,
  avgAge: Number,
  totalValue: String,
  confederation: String,
  points: Number,
});

module.exports = mongoose.model('Team', teamSchema);
