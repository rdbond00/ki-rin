module.exports = {
	name: 'unban',
	description: 'unban',
	expectedArgs: '(user, reason)',
	reqPerms: ['moderator'],
	async execute(message, args) {

		if(	message.channel.id != 950784217950863480 && message.channel.id != 937866303803392040 && message.channel.id != 937887865420005436 ) return;
		
	// Most of this command is identical to kick, except that here we'll only let admins do it.
		// In the real world mods could ban too, but this is just an example, right? ;)
		if(!message.member.roles.cache.has('MODERATOR_ROLE'))return message.reply("Sorry, you don't have permissions to use this!");
    
		let user = args[0].slice(2, -1)


		let reason = args.slice(1).join(' ');
		if(!reason) reason = "No reason provided";
    
		await message.guild.unban(user)
			.catch(error => message.reply(`Sorry ${message.author} I couldn't unban because of : ${error}`));
					const channel = message.member.guild.channels.cache.get(logChannelIDs.moderationlog)
					const Embed = new MessageEmbed()
						.setColor('#00e600')
						.setAuthor('User Kicked', `${member.user.displayAvatarURL()}`)
						.setDescription(`**${message.author} unbanned <@${user}>** \n \n **Reason:** \n ${reason}  `)
						.setTimestamp()
						.setFooter(`ID: ${member.id}`);	
			channel.send({ embeds: [Embed] })
	},
};