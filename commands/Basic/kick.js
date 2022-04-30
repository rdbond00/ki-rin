module.exports = {
	name: 'kick',
	description: 'Kicks the specified user from the guild',
	expectedArgs: '(user, reason)',
	reqPerms: ['moderator'],
	async execute(message, args) {

		if(	message.channel.id != 950784217950863480 && message.channel.id != 937866303803392040 && message.channel.id != 937887865420005436 ) return;
		
		// This command must be limited to mods and admins. In this example we just hardcode the role names.
		if(!message.member.roles.cache.has('MODERATOR_ROLE'))return message.reply("Sorry, you don't have permissions to use this!");
    
		// Let's first check if we have a member and if we can kick them!
		// message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
		// We can also support getting the member by ID, which would be args[0]
		let member = message.mentions.members.first() || message.guild.members.fetch(args[0]);
		if(!member)
		return message.reply("Please mention a valid member of this server");
		if(!member.kickable) 
		return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
		// slice(1) removes the first part, which here should be the user mention or ID
		// join(' ') takes all the various parts to make it a single string.
		let reason = args.slice(1).join(' ');
		if(!reason) reason = "No reason provided";
    
		// Now, time for a swift kick in the nuts!
		await member.kick(reason)
		.catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
					const channel = member.guild.channels.cache.get(logChannelIDs.moderationlog)
					const Embed = new MessageEmbed()
						.setColor('#00e600')
						.setAuthor('User Kicked', `${member.user.displayAvatarURL()}`)
						.setDescription(`**${message.author} kicked <@${member.user.id}>** \n \n **Reason:** \n ${reason}  `)
						.setTimestamp()
						.setFooter(`ID: ${member.id}`);

		channel.send({ embeds: [Embed] })

	},
};