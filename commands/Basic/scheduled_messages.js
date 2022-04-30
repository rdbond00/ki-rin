const momentTimezone = require('moment-timezone')
const db = require("../../Models/scheduled-schema")

module.exports = {
    name: 'schedule',
	description: 'Scheduled messages',
    expectedArgs: '(channel, date)',
	reqPerms: ['moderator'],
    async execute(message, args) {
        
        if(	message.channel.id != 950784217950863480 && message.channel.id != 937866303803392040 && message.channel.id != 937887865420005436 ) return;

        const {mentions, guild, channel} = message

        const targetChannel = mentions.channels.first()
        if (!targetChannel) {
            message.reply('Please tag a channel to send your message in.')
            return
        }

        //Remove the channel tag from the args list
        args.shift()

        const [date, time, clockType, timeZone ] = args

        if(clockType !== 'AM' && clockType !== 'PM') {
            message.reply(`You must provide either "AM" or "PM", you provided "${clockType}"`)
            return
        }

        const validTimeZones = momentTimezone.tz.names()
        if(!validTimeZones.includes(timeZone)) {
            message.reply('Unknown timezone! Please use one of the following: <>')
            return
        }

        const targetDate = momentTimezone.tz(
            `${date} ${time} ${clockType}`,
            'YYYY-MM-DD HH:mm A',
            timeZone
        )

        message.reply('Please send the message you would like to schedule')

        const filter = (newMessage) => {
            return newMessage.author.id === message.author.id
        }    


        const collector = channel.createMessageCollector({ filter, max: 1, time: 1000 * 60  }); 

        collector.on('end', collected => {
            const collectedMessage = collected.first()

            if(!collectedMessage) {
                message.reply('You did not reply in time.')
                return
            }

            message.reply('Your message has been scheduled.')

            db.findOne({ date: targetDate.valueOf(), content: collectedMessage.content, guildId: guild.id, channelId: targetChannel.id}, async (err, data) => {
                if(err) throw err;
                if(!data) {
                    data = new db({
                        date: targetDate.valueOf(),
                        content: collectedMessage.content,
                        guildId: guild.id,
                        channelId: targetChannel.id
                    })
                }
                data.save()
            });

        })
        
    }
}