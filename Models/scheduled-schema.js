const { Schema, model } = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const reqDate = {
    type: Date,
    required: true
}

module.exports = model("scheduled-post", new Schema({
    date: reqDate,
    content: reqString,
    guildId: reqString,
    channelId: reqString
}))