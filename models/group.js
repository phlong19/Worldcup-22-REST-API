const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    group: {
        type: String,
        required:true
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required:true,
    }
})

module.exports = mongoose.model('worldcup22Groups', groupSchema);