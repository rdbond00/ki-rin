const { Schema, model } = require('mongoose');
const reqString = {
    type: String,
    required: true
}
module.exports = model("reactrole", new Schema({
    guildId:    reqString,
    messageId: reqString,
    channelId: reqString,
    reactRoles: Array
}))