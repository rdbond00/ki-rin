module.exports = {event: 'guildBanAdd'}
module.exports.function = memberbanned = (guild, user) => {
    const channel = guild.channels.cache.get(logChannelIDs.moderationlog)
    const Embed = new MessageEmbed()
        .setColor('#00e600')
        .setAuthor({name:'Member Banned', iconURL:`${user.displayAvatarURL()}`})
        .setThumbnail(`${user.displayAvatarURL()}`)
        .setDescription(`<@${user.id}> ${user.tag} `)
        .setTimestamp()
        .setFooter(`ID: ${user.id}`);

    channel.send({ embeds: [Embed] })
};