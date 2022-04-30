const { SlashCommandBuilder } = require('@discordjs/builders');
const momentTimezone = require('moment-timezone')
const db = require("../../Models/birthdays")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('birthday')
		.setDescription('Adds users birthday to guild database'),
	async execute(interaction) {

        const {guild} = interaction

        const date = interaction.options.getString('birthdate')

        var targetDate = momentTimezone.tz(
            `${new Date().getFullYear()}-${date} 08:00 AM`,
            'YYYY-MM-DD HH:mm A',
            'America/New_York'
        )


        if(targetDate <= Date.now()){
            targetDate = momentTimezone.tz(
                `${new Date().getFullYear()+1}-${date} 08:00 AM`,
                'YYYY-MM-DD HH:mm A',
                'America/New_York'
            )

        }


        const author = client.guilds.cache.get(guild.id).members.cache.get(interaction.user.id)

        const bdayMessage = `Today is <@${author.user.id}>'s birthday.`

            db.findOne({ date: targetDate.valueOf(), content: bdayMessage, UserId: author.user.id, UserTag: author.user.tag, guildId: guild.id, channelId: logChannelIDs.announcements.valueOf()}, async (err, data) => {
                if(err) throw err;
                if(!data) {
                    data = new db({
                        date: targetDate.valueOf(),
                        content: bdayMessage,
                        UserId: author.user.id,
                        UserTag: author.user.tag,
                        guildId: guild.id,
                        channelId: logChannelIDs.announcements.valueOf()
                    })
                }
                data.save()
            });
            interaction.reply({content: 'Your birthday has been saved',ephemeral: true})
        
        
	},
};