const scheduledposts = require("../Models/scheduled-schema")

async function checkForPosts() {
    const query = {
        date: {
            $lte: Date.now()
        }
    }

    const results = await scheduledposts.find(query)

    for (const post of results) {
        const { guildId, channelId, content} = post

        const guild = await client.guilds.fetch(guildId)
        if (!guild) {
            continue
        }

        const channel = guild.channels.cache.get(channelId)
        if(!channel) {
            continue
        }

        channel.send(content)
    }

    await scheduledposts.deleteMany(query)

    setTimeout(checkForPosts, 1000 * 10)
}

module.exports.function = checkForPosts