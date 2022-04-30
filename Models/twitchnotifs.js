const { Schema, model } = require('mongoose');

const reqString = {
    type: String,
    required: true
}

module.exports = model("twitchnotif", new Schema({
    guildId: reqString,
    messageId: String,
    twitchuser: reqString,
    currentlylive: Boolean,
    messageposted: Boolean
}))