module.exports = {
	name: 'add_button',
	description: 'Allows adding a button to an existing message for interaction',
	alias: 'add_b',
	expectedArgs: '(messageId)',
	reqPerms: ['moderator'],
	execute(message, args) {
		
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Agree')
					.setStyle('PRIMARY'),
					new MessageButton()
					.setCustomId('secondary')
					.setLabel('Disagree')
					.setStyle('PRIMARY'),	
			);

		channel = message.guild.channels.cache.get(RoleChannelIDs.Rules_Channel)
		channel.messages.fetch(args[0]).then(message => {
			message.edit({components: [row]});
		}).catch(err => {
			console.error(err);
		});
		
		
			
		
	},
};