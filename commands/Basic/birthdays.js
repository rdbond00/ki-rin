const momentTimezone = require('moment-timezone')
const db = require("../../Models/birthdays")

module.exports = {
    name: 'birthday',
	description: 'Adds users birthday to guild database',
    expectedArgs: '(birthday(MM/dd))',
	reqPerms: ['everyone'],
    async execute(message, args) {
        
        if(	message.channel.id != 950784217950863480 && message.channel.id != 937866303803392040 && message.channel.id != 937887865420005436 ) return;

        const {guild} = message

        const [date] = args

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


        const author = client.guilds.cache.get(guild.id).members.cache.get(message.author.id)

        const bdayMessage = `Today is <@${message.author.id}>'s birthday.`

            db.findOne({ date: targetDate.valueOf(), content: bdayMessage, UserId: author.user.id, UserTag: author.user.tag, guildId: guild.id, channelId: logChannelIDs.feedbacklog.valueOf()}, async (err, data) => {
                if(err) throw err;
                if(!data) {
                    data = new db({
                        date: targetDate.valueOf(),
                        content: bdayMessage,
                        UserId: author.user.id,
                        UserTag: author.user.tag,
                        guildId: guild.id,
                        channelId: logChannelIDs.feedbacklog.valueOf()
                    })
                }
                data.save()
            });
            message.reply('Your birthday has been saved')
        
        
    }
}