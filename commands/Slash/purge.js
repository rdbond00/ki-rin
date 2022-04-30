const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Remove last message from any user in channel')
		.addSubcommand(subcommand =>
            subcommand
                .setName('all')
                .setDescription('Remove last messages from any user in channel')
                
                )
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Removes last messages from specific user in channel')
						
						),				
				
	async execute(interaction) {
		if(interaction.options.getSubcommand() === 'all'){

		// get the delete count, as an actual number.
		const deleteCount = interaction.options.getInteger('number')
    
		// Ooooh nice, combined conditions. <3
		if(!deleteCount || deleteCount < 1 || deleteCount > 100)
			return interaction.reply({ content: "Please provide a number between 1 and 100 for the number of messages to delete", ephemeral: true });


		// So we get our messages, and delete them. Simple enough, right?
		const fetched = await interaction.member.guild.channels.cache.get(interaction.channelId).messages.fetch({limit: deleteCount});

		interaction.member.guild.channels.cache.get(interaction.channelId).bulkDelete(fetched)
			.catch(error => interaction.reply({ content: `Couldn't delete messages because of: ${error}`, ephemeral: true }));
		interaction.reply({ content: `The last ${deleteCount} messages have been removed `, ephemeral: true })



		}

		if(interaction.options.getSubcommand() === 'user'){

		// get the user to remove messages from	
			const user = interaction.options.getUser('user').id

		// get the delete count, as an actual number.
			const deleteCount = interaction.options.getInteger('number')

		// Ooooh nice, combined conditions. <3
		if(!deleteCount || deleteCount < 1 || deleteCount > 99)
		return interaction.reply({ content: "Please provide a number between 1 and 100 for the number of messages to delete", ephemeral: true });

		// So we get our messages, and delete them. Simple enough, right?
		await interaction.member.guild.channels.cache.get(interaction.channelId).messages.fetch({limit: 100});

		const usermessages = interaction.member.guild.channels.cache.get(interaction.channelId).messages.cache.filter(m => m.author.id === user).first(deleteCount)

		interaction.member.guild.channels.cache.get(interaction.channelId).bulkDelete(usermessages)
			.catch(error => interaction.reply({ content: `Couldn't delete messages because of: ${error}`, ephemeral: true }))
		interaction.reply({ content: `The last ${deleteCount} messages have been removed `, ephemeral: true })





		}

		
	},
};
