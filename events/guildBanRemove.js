module.exports = {event: 'guildBanRemove'}
module.exports.function = memberunbanned = (guild, user) => {
    const channel = guild.channels.cache.get(logChannelIDs.moderationlog)
    const Embed = new MessageEmbed()
        .setColor('#00e600')
        .setAuthor({name:'Member Unbanned', iconURL:`${user.displayAvatarURL()}`})
        .setThumbnail(`${user.displayAvatarURL()}`)
        .setDescription(`<@${user.id}> ${user.tag} `)
        .setTimestamp()
        .setFooter(`ID: ${user.id}`);

    channel.send({ embeds: [Embed] })
};