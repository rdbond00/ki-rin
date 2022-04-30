const { Schema, model } = require('mongoose');

const reqString = {
    type: String,
    required: true
}

module.exports = model("youtubenotif", new Schema({
    guildId: reqString,
    lastmessageId: String,
    youtuberChannelName: reqString,
    youtuberChannelId: reqString,
    uploadsPlaylistId: reqString,
    lastVideoID: reqString,
}))