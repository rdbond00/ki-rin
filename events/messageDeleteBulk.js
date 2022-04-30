module.exports = {event: 'messageDeleteBulk'}
module.exports.function = bulkmessagedelete = (messages) => {

    const channel = messages.first().guild.channels.cache.get(logChannelIDs.moderationlog)
    const Embed = new MessageEmbed()
        .setColor('#00e600')
        .setAuthor({name:`${messages.first().guild}`, icoNURL:`https://cdn.discordapp.com/icons/${messages.first().guild.id}/${messages.first().guild.icon}.png`})
        .setDescription(`**Bulk Delete in **<#${messages.first().channel.id}>, **${messages.size} messages deleted**`)
        .setTimestamp()

    channel.send({ embeds: [Embed] })
};