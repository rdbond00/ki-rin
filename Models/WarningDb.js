const { Schema, model } = require('mongoose');

module.exports = model("WarningDB", new Schema({
    guildId:    String,
    UserId:     String,
    UserTag:    String,
    Content:    Array,
}))