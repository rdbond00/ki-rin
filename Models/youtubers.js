const { Schema, model } = require('mongoose');

const reqString = {
    type: String,
    required: true
}

module.exports = model("youtuber", new Schema({
    guildId: String,
    youtuberChannelName: reqString,
    youtuberChannelId: reqString,
    uploadsPlaylistId: String,
    Enabled: Boolean
}))