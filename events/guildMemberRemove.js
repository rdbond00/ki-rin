module.exports = {event: 'guildMemberRemove'}
module.exports.function = memberleft = (member) => {


    if (member.deleted = true) {
        const channel = member.guild.channels.cache.get(logChannelIDs.actionlog)
        const Embed = new MessageEmbed()
            .setColor('#00e600')
            .setAuthor({name:'Member Left', iconURL:`${member.user.displayAvatarURL()}`})
            .setThumbnail(`${member.user.displayAvatarURL()}`)
            .setDescription(`<@${member.id}> ${member.user.tag} `)
            .setTimestamp()
            .setFooter(`ID: ${member.id}`);

        channel.send({ embeds: [Embed] })
}};