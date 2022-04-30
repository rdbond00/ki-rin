const { Schema, model } = require('mongoose');

const reqString = {
    type: String,
    required: true
}

module.exports = model("streamer", new Schema({
    guildId: String,
    twitchuser: reqString,
    Enabled: Boolean
}))