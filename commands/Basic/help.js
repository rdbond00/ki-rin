module.exports = {
	name: 'help',
	description: 'Provides user with details on all available commands (that they have permission for)',
	expectedArgs: null,
	reqPerms: ['everyone'],
	async execute(message, args) {
		
		if(	message.channel.id != 950784217950863480 && message.channel.id != 937866303803392040 && message.channel.id != 937887865420005436 ) return;

		var Perms = ['everyone',null]
		if(message.member.permissions.has('ADMINISTRATOR')){
			Perms.push('moderator')
		}
		
		const availableCommands = client.basiccommands.filter(c => c.reqPerms.some(element => Perms.some(e => e === element)))
		var command = Array.from(availableCommands.values()).find((e,index) => index === 0)
		
		var Embed = new MessageEmbed()
        .setDescription(`name: ${command.name}\ndescription: ${command.description}\nalias: ${command.alias}\nExpected Args: ${command.expectedArgs}\n Required Permissions: ${command.reqPerms}`)

		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('back')
				.setLabel('back')
				.setStyle('PRIMARY'),
				new MessageButton()
				.setCustomId('next')
				.setLabel('next')
				.setStyle('SUCCESS'),
				new MessageButton()
				.setCustomId('exit')
				.setLabel('exit')
				.setStyle('DANGER'),
		);

			message.reply({ embeds: [Embed], components: [row]})
		
	},
};