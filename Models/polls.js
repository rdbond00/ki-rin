const { Schema, model } = require('mongoose');

const reqString = {
    type: String,
    required: true
}

module.exports = model("poll", new Schema({
    guildId: reqString,
    pollId: reqString,
    channelId: reqString,
    pollTitle: reqString,
    pollChoices: Array,
    pollResults: Array,
    pollParticipants: Array,
    currentlyActive: Boolean
}))