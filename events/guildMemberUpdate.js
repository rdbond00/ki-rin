module.exports = {event: 'guildMemberUpdate'}
module.exports.function = memberupdated = (oldMember, newMember) => {	
	
	if (oldMember.displayName != newMember.displayName) {
		const channel = newMember.guild.channels.cache.get(logChannelIDs.actionlog)
		const Embed = new MessageEmbed()
			.setColor('#00e600')
			.setAuthor({name:`${newMember.user.tag}`, iconURL:`${newMember.user.displayAvatarURL()}`})
			.setDescription(`<@${newMember.user.id}> **nickname changed** \n \n **Before:**\n ${oldMember.displayName}\n \n **After:**\n ${newMember.displayName}`)
			.setTimestamp()
			.setFooter(`ID: ${newMember.user.id}`);
		channel.send({ embeds: [Embed] })
	}

	if (oldMember.roles.cache.size > newMember.roles.cache.size) {
		var oldRole
		oldMember.roles.cache.forEach(role => {
			if (!newMember.roles.cache.has(role.id)){
				oldRole = role.name
			}
		})
		const channel = newMember.guild.channels.cache.get(logChannelIDs.actionlog)
			const Embed = new MessageEmbed()
				.setColor('#ff6600')
				.setAuthor({name:`${newMember.user.tag}`, iconURL:`${newMember.user.displayAvatarURL()}`})
				.setDescription(`<@${newMember.user.id}> **was removed from the** `+"`"+oldRole+"`"+` **role**`)
				.setTimestamp()
				.setFooter(`ID: ${newMember.user.id}`);
			channel.send({ embeds: [Embed] })
	}
	
	if (oldMember.roles.cache.size < newMember.roles.cache.size) {
		var newRole
		newMember.roles.cache.forEach(role => {
			if (!oldMember.roles.cache.has(role.id)){
				newRole = role.name
			}
		})
		const channel = newMember.guild.channels.cache.get(logChannelIDs.actionlog)
			const Embed = new MessageEmbed()
				.setColor('#ff6600')
				.setAuthor({name:`${newMember.user.tag}`, iconURL:`${newMember.user.displayAvatarURL()}`})
				.setDescription(`<@${newMember.user.id}> **was given the** `+"`"+newRole+"`"+` **role**`)
				.setTimestamp()
				.setFooter(`ID: ${newMember.user.id}`);
			channel.send({ embeds: [Embed] })
	}

};