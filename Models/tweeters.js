const { Schema, model } = require('mongoose');

const reqString = {
    type: String,
    required: true
}

module.exports = model("tweeter", new Schema({
    guildId: String,
    twitteruser: reqString,
    Enabled: Boolean
}))