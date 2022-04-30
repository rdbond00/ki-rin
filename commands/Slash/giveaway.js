const { SlashCommandBuilder } = require('@discordjs/builders');

var roll = 1

module.exports = {
	data: new SlashCommandBuilder()
		.setName('giveaway')
		.setDescription('Run/Manage giveaway in the channel')
		.addSubcommand(subcommand =>
            subcommand
                .setName('start')
                .setDescription('Starts a giveaway in the channel')
                
                )
		.addSubcommand(subcommand =>
			subcommand
				.setName('end')
				.setDescription('Ends the current giveaway in the channel')
						
						),				
				
	async execute(interaction, client) {
		if(interaction.options.getSubcommand() === 'start'){
			const emoji = interaction.options.getString('emoji').toString()
			const channel = interaction.guild.channels.cache.get(interaction.channelId)
			channel.messages.fetch({ limit: 1}).then(messages => {
                message = messages.first()

                if(!message) {
					interaction.reply({ content: 'There are no mesages! ', ephemeral: true })
                    return
                }

                message.react(emoji)
				interaction.reply({ content: `Giveaway was started with the ${emoji} emoji`, ephemeral: true })
            })

		}

		if(interaction.options.getSubcommand() === 'end'){
			const channel = interaction.guild.channels.cache.get(interaction.channelId)

			channel.messages.fetch({ limit: 1}).then( async (messages) => {
                message = messages.first()

                if(!message) {
					interaction.reply({ content: 'There are no mesages! ', ephemeral: true })
                    return
                }

                const { users } = await message.reactions.cache.first().fetch()
                const reactionusers = await users.fetch()

                const possibleWinners = Array.from(reactionusers.values()).filter((user) => {
                    return !user.bot
                })

                const winner = possibleWinners[Math.floor(Math.random() * possibleWinners.length)]

				const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('accept')
						.setLabel('Accept')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('reroll')
						.setLabel('Reroll')
						.setStyle('PRIMARY'),
				);



				interaction.reply({ content: `<@${winner.id}> was selected as the winner of the giveaway. Please Accept/Reroll. [Roll#: ${roll}]`, components: [row], ephemeral: true })
				roll = roll + 1
				client.on('interactionCreate', interaction => {
					if (!interaction.isButton()) return;
					if (interaction.customId === "accept") {
						//Do stuff
						channel.send(`<@${winner.id}>, you are the winner of the giveaway. Congrats! `)
						return
					}
					if (interaction.customId === "reroll") {
						//Do stuff
							interaction.reply({ content: `<@${winner.id}> was selected as the winner of the giveaway. Please Accept/Reroll. [Roll#: ${roll}]`, components: [row], ephemeral: true })
							roll = roll + 1
						return
					}					
				})

            })			

		}

		
	},
};
