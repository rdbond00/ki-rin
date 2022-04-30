module.exports = {
	name: 'ban',
	description: 'Bans a user from the server',
	expectedArgs: '(user, reason)',
	reqPerms: ['moderator'],
	async execute(message, args) {
		
		if(	message.channel.id != 950784217950863480 && message.channel.id != 937866303803392040 && message.channel.id != 937887865420005436 ) return;

		// Most of this command is identical to kick, except that here we'll only let admins do it.
		// In the real world mods could ban too, but this is just an example, right? ;)
		if(!message.member.roles.cache.has('MODERATOR_ROLE'))return message.reply("Sorry, you don't have permissions to use this!");
    
		let member = message.mentions.members.first();
		if(!member)
			return message.reply("Please mention a valid member of this server");
		if(!member.bannable) 
			return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

		let reason = args.slice(1).join(' ');
		if(!reason) reason = "No reason provided";
    
		await member.ban(reason)
			.catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
					const channel = member.guild.channels.cache.get(logChannelIDs.moderationlog)
					const Embed = new MessageEmbed()
						.setColor('#00e600')
						.setAuthor('User Kicked', `${member.user.displayAvatarURL()}`)
						.setDescription(`**${message.author} banned <@${member.user.id}>** \n \n **Reason:** \n ${reason}  `)
						.setTimestamp()
						.setFooter(`ID: ${member.id}`);

		channel.send({ embeds: [Embed] })
	},
};