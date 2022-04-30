const { Schema, model } = require('mongoose');

const reqString = {
    type: String,
    required: true
}

module.exports = model("redditnotif", new Schema({
    guildId: reqString,
    lastmessageId: String,
    subreddit: reqString,
    lastpostId: String
}))