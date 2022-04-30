



async function updateMetrics() {

const serverMembers = io.metric({

    name: 'Members'

})

const serverBots = io.metric({

    name: 'Bots'

})

const onlineMembers = io.metric({

    name: 'Total Online'

})

const servers = io.metric({

    name: 'Guilds'

})




client.guilds.cache.get(config.guildId).members.fetch().then(fetchedMembers => {

    const totalMembers = fetchedMembers.filter(member => !member.user.bot).size
    const totalBots = fetchedMembers.filter(member => member.user.bot).size
    const totalOnline = fetchedMembers.filter(member => member.presence?.status === 'online').size
    
    serverMembers.set(totalMembers)
    serverBots.set(totalBots)
    onlineMembers.set(totalOnline)

}).catch(error => console.log(error))

servers.set(1)

setTimeout(updateMetrics, 1000 * 60)

}

module.exports.function = updateMetrics
