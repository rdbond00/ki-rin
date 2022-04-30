module.exports = {
	name: 'mute',
	description: 'Mutes a user and prevents them from talking in text/voice',
	expectedArgs: '(user, reason)',
	reqPerms: ['moderator'],
	async execute(message, args) {

		if(	message.channel.id != 950784217950863480 && message.channel.id != 937866303803392040 && message.channel.id != 937887865420005436 ) return;
		
	// Most of this command is identical to kick, except that here we'll only let admins do it.
		// In the real world mods could mute too, but this is just an example, right? ;)
		if(!message.member.roles.cache.has('937858030874271856'))return message.reply("Sorry, you don't have permissions to use this!");
		if(message.mentions.members.first() === undefined) {
			return message.reply("Please don't forget to mention a user")
		}
		let member = message.guild.members.cache.get(message.mentions.members.first().id);
		console.log(member.bot)
		if(!member)
			return message.reply("Please mention a valid member of this server");
		
		const timevalue = args[1];
		let reason = args.slice(2).join(' ');
		if(!reason) reason = "No reason provided";
		
		let mute_role = message.guild.roles.cache.find(role => role.name === 'Muted');
			member.roles.add(mute_role); // <- this assign the role
					const channel = member.guild.channels.cache.get(logChannelIDs.moderationlog)
					const Embed = new MessageEmbed()
						.setColor('#00e600')
						.setAuthor('User Kicked', `${member.user.displayAvatarURL()}`)
						.setDescription(`**${member.user.tag} has been muted for ${timevalue} minutes by ${message.author.tag}** \n \n **Reason:** \n ${reason}`)
						.setTimestamp()
						.setFooter(`ID: ${member.id}`);
				setTimeout(() => {member.roles.remove(mute_role);}, timevalue * 60000); // <- sets a timeout to unmute the user.
			channel.send({ embeds: [Embed] })
	},
};