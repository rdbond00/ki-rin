const { Schema, model } = require('mongoose');

const reqString = {
    type: String,
    required: true
}

module.exports = model("twitternotif", new Schema({
    guildId: reqString,
    lastmessageId: String,
    twitteruser: reqString,
    lastTweetID: reqString,
}))