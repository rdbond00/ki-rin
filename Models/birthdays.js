const { Schema, model } = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const reqDate = {
    type: Date,
    required: true
}

module.exports = model("birthday", new Schema({
    date: reqDate,
    content: reqString,
    UserId:  reqString,
    UserTag: reqString,
    guildId: reqString,
    channelId: reqString
}))