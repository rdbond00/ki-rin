module.exports = {event: 'messageUpdate'}
module.exports.function = messageedited = (oldMessage, newMessage) => {


		const channel = newMessage.guild.channels.cache.get(logChannelIDs.moderationlog)
		const Embed = new MessageEmbed()
			.setColor('#00e600')
			.setAuthor({name:`${newMessage.author.tag}`, iconURL:`${newMessage.author.displayAvatarURL()}`})
			.setDescription(`**Message edited in** <#${newMessage.channel.id}> [Jump to Message](${newMessage.url})\n \n **Before:**\n ${oldMessage.content}\n \n **After:**\n ${newMessage.content}`)
			.setTimestamp()
			.setFooter(`ID: ${newMessage.author.id}`);

		channel.send({ embeds: [Embed] })
};