const { SlashCommandBuilder } = require('@discordjs/builders');
const settingsdb = require("../../Models/settings")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('settings')
    .setDescription('Allows adding or modifiying of the bot settings'),
    async execute(interaction) {

        const Group = interaction.options._group
        const Sub = interaction.options.getSubcommand(['prefix','logging','bannedwords','antispam','show','reset'])

        if(Group === "set"){

            if(Sub === "prefix"){

                const newPrefix = interaction.options.getString('prefix')

                if(newPrefix === null){
                    interaction.reply({ content: `The prefix cannot be empty, please try the command again.`, ephemeral: true });
                } else if(newPrefix.length > 1){
                    interaction.reply({ content: `The prefix cannot be longer than 1 character, please try the command again.`, ephemeral: true });
                }else {

                    settingsdb.findOne({guildId: config.guildId},async (err, data) => {

                        data.prefix = newPrefix
                        savedSettings.prefix = newPrefix

                        data.save()
                    })

                    interaction.reply({ content: `Bot commands prefix has been set to: ${newPrefix}`, ephemeral: true });
                }
            }

            if(Sub === "logging"){

                const actionlog = interaction.options.getChannel(('actionlog'))
                const moderationlog = interaction.options.getChannel(('moderationlog'))
                const modmaillog = interaction.options.getChannel(('modmaillog'))
                const errorlog = interaction.options.getChannel(('errorlog'))
                const sociallog = interaction.options.getChannel(('sociallog'))

                settingsdb.findOne({guildId: config.guildId},async (err, data) => {

                    if(actionlog !== null){

                        savedSettings.loggingChannels.actionlog.channelID = actionlog.id
                        data.loggingChannels.actionlog.channelID = actionlog.id
                
                    }
                    if(moderationlog !== null){
                        
                        savedSettings.loggingChannels.moderationlog.channelID = moderationlog.id
                        data.loggingChannels.moderationlog.channelID = moderationlog.id

                    }
                    if(modmaillog !== null){
                        
                        savedSettings.loggingChannels.feedbacklog.channelID = modmaillog.id
                        data.loggingChannels.feedbacklog.channelID = modmaillog.id

                    }
                    if(errorlog !== null){
                        
                        savedSettings.loggingChannels.errorlog.channelID = errorlog.id
                        data.loggingChannels.errorlog.channelID = errorlog.id

                    }
                    if(sociallog !== null){
                        
                        savedSettings.loggingChannels.socialnotifs.channelID = sociallog.id
                        data.loggingChannels.socialnotifs.channelID = sociallog.id

                    }

                    data.save()

                })

                interaction.reply({ content: `Logging channels have been updated.`, ephemeral: true });
            }

            if(Sub === "bannedwords"){

                const newBannedwords = interaction.options.getString('bannedwords')

                settingsdb.findOne({guildId: config.guildId},async (err, data) => {
                   
                    data.bannedwords = newBannedwords.split(",")
                    savedSettings.bannedwords = newBannedwords.split(",")

                    data.save()
                })
                
                interaction.reply({ content: `Banned words have been set to: ${newBannedwords.split(",")}`, ephemeral: true });

            }

            if(Sub === "antispam"){

                const warnThreshold = interaction.options.getNumber('warn_threshold')
                const muteThreshold = interaction.options.getNumber('mute_threshold')
                const kickThreshold = interaction.options.getNumber('kick_threshold')
                const banThreshold = interaction.options.getNumber('ban_threshold')
                const maxInterval = interaction.options.getNumber('max_interval')
                const warnMessage = interaction.options.getString('warn_message')
                const kickMessage = interaction.options.getString('kick_message')
                const muteMessage = interaction.options.getString('mute_message')
                const banMessage = interaction.options.getString('ban_message')
                const maxDuplicatesWarning = interaction.options.getNumber('max_duplicates_warning')
                const maxDuplicatesKick = interaction.options.getNumber('max_duplicates_kick')
                const maxDuplicatesBan = interaction.options.getNumber('max_duplicates_ban')
                const maxDuplicatesMute = interaction.options.getNumber('max_duplicates_mute')
                const ignoredMembers = interaction.options.getString('ignored_members')
                const muteRoleName = interaction.options.getString('mute_role_name')
                const muteTime = interaction.options.getNumber('mute_time')
                const modLogsEnabled = interaction.options.getBoolean('mod_logs_enabled')
                const modLogsChannelName = interaction.options.getString('mod_logs_channelname')

                settingsdb.findOne({guildId: config.guildId},async (err, data) => {
                   
                    if(warnThreshold !== null){
                        data.antispam.warnThreshold = warnThreshold
                        savedSettings.antispam.warnThreshold = warnThreshold
                    }
                    if(muteThreshold !== null){
                        data.antispam.muteThreshold = muteThreshold
                        savedSettings.antispam.muteThreshold = muteThreshold   
                    }
                    if(kickThreshold !== null){
                        data.antispam.kickThreshold = kickThreshold
                        savedSettings.antispam.kickThreshold = kickThreshold
                    }
                    if(banThreshold !== null){
                        data.antispam.banThreshold = banThreshold
                        savedSettings.antispam.banThreshold = banThreshold
                    }
                    if(maxInterval !== null){
                        data.antispam.maxInterval = maxInterval
                        savedSettings.antispam.maxInterval = maxInterval
                    }
                    if(warnMessage !== null) {
                        data.antispam.warnMessage = warnMessage
                        savedSettings.antispam.warnMessage = warnMessage
                    }
                    if(kickMessage !== null){
                        data.antispam.kickMessage = kickMessage
                        savedSettings.antispam.kickMessage = kickMessage
                    }
                    if(muteMessage !== null){
                        data.antispam.muteMessage = muteMessage
                        savedSettings.antispam.muteMessage = muteMessage
                    }
                    if(banMessage !== null){
                        data.antispam.banMessage = banMessage
                        savedSettings.antispam.banMessage = banMessage
                    }
                    if(maxDuplicatesWarning !== null){
                        data.antispam.maxDuplicatesWarning = maxDuplicatesWarning
                        savedSettings.antispam.maxDuplicatesWarning = maxDuplicatesWarning
                    }
                    if(maxDuplicatesKick !== null){
                        data.antispam.maxDuplicatesKick = maxDuplicatesKick
                        savedSettings.antispam.maxDuplicatesKick = maxDuplicatesKick
                    }
                    if(maxDuplicatesBan !== null){
                        data.antispam.maxDuplicatesBan = maxDuplicatesBan
                        savedSettings.antispam.maxDuplicatesBan = maxDuplicatesBan
                    }
                    if(maxDuplicatesMute !== null){
                        data.antispam.maxDuplicatesMute = maxDuplicatesMute
                        savedSettings.antispam.maxDuplicatesMute = maxDuplicatesMute
                    }
                    if(ignoredMembers !== null){
                        data.antispam.ignoredMembers = ignoredMembers.split(",")
                        savedSettings.antispam.ignoredMembers = ignoredMembers.split(",")
                    }
                    if(muteRoleName !== null){
                        data.antispam.muteRoleName = muteRoleName
                        savedSettings.antispam.muteRoleName = muteRoleName
                    }
                    if(muteTime !== null){
                        data.antispam.muteTime = muteTime
                        savedSettings.antispam.muteTime = muteTime
                    }
                    if(modLogsEnabled !== null){
                        data.antispam.modLogsEnabled = modLogsEnabled
                        savedSettings.antispam.modLogsEnabled = modLogsEnabled
                    }
                    if(modLogsChannelName !== null){
                        data.antispam.modLogsChannelName = modLogsChannelName
                        savedSettings.antispam.modLogsChannelName = modLogsChannelName
                    }

                    data.save()
                })

                interaction.reply({ content: `Antispam settings have been updated.`, ephemeral: true });
            }
        }
        else if (Group === null) {

            if(Sub === "show"){
                console.log("show settings")
            }

            if(Sub === "reset"){
                console.log("reset settings")
            }
        }

    }
}