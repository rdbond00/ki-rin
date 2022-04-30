module.exports = {event: 'messageDelete'}
module.exports.function = messageremoved = (Message) => {
	if(Message.author === null) return;
	if(Message.guild === null) return;
	
		const channel = Message.guild.channels.cache.get(logChannelIDs.moderationlog)
		const Embed = new MessageEmbed()
			.setColor('#00e600')
			.setAuthor({name:`${Message.author.tag}`, iconURL:`${Message.author.displayAvatarURL()}`})
			.setDescription(`**Message sent by** <@${Message.author.id}> **deleted in** <#${Message.channel.id}> \n ${Message.content}`)
			.setTimestamp()
			.setFooter(`ID: ${Message.author.id}`);

		channel.send({ embeds: [Embed] })
};