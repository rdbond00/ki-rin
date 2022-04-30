const { Schema, model } = require('mongoose');

module.exports = model("setting", new Schema({
    guildId:    String,
    prefix: String,
    loggingChannels : {
        actionlog: {
            channelID: String,
            Enabled: Boolean
        },
        moderationlog: {
            channelID: String,
            Enabled: Boolean
        },
        feedbacklog: {
            channelID: String,
            Enabled: Boolean
        },
        errorlog: {
            channelID: String,
            Enabled: Boolean
        },
        socialnotifs: {
            channelID: String,
            Enabled: Boolean
        },
        twitternotifs: {
            channelID: String,
            Enabled: Boolean
        },
        announcements: {
            channelID: String,
            Enabled: Boolean
        },

    },
    bannedwords: Array,
    antispam: {
        warnThreshold: Number,
        muteThreshold: Number,
        kickThreshold: Number,
        banThreshold: Number,
        maxInterval: Number,
        warnMessage: String,
        kickMessage: String,
        muteMessage: String,
        banMessage: String,
        maxDuplicatesWarning: Number,
        maxDuplicatesKick: Number,
        maxDuplicatesBan: Number,
        maxDuplicatesMute: Number,
        ignoredPermissions: Array,
        ignoreBots: Boolean,
        verbose: Boolean,
        ignoredMembers: Array,
        muteRoleName: String,
        muteTime: Number,
        removeMessages: Boolean,
        modLogsEnabled: Boolean,
        modLogsChannelName: String,
        modLogsMode: String
    }

}))