const { Schema, model } = require('mongoose');

const reqString = {
    type: String,
    required: true
}

module.exports = model("subreddit", new Schema({
    guildId: String,
    subreddit: reqString,
    Enabled: Boolean
}))