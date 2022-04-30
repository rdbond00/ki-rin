const birthdays = require("../Models/birthdays")
const momentTimezone = require('moment-timezone')

async function checkForBdays() {
    const query = {
        date: {
            $lte: Date.now()
        }
    }

    const results = await birthdays.find(query)

    for (const bday of results) {
        const { _id, date, guildId, channelId, content} = bday

        const guild = await client.guilds.fetch(guildId)
        if (!guild) {
            continue
        }

        const channel = guild.channels.cache.get(channelId)
        if(!channel) {
            continue
        }
   
        channel.send(content)
        
        await birthdays.findByIdAndUpdate(
            {_id: _id},
            {
            $set: {date: new Date(date.setFullYear(date.getFullYear() + 1))}
            })
    }

    setTimeout(checkForBdays, 1000 * 10)
}

module.exports.function = checkForBdays