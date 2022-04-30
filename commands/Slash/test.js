const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('test'),
	async execute(interaction) {
        const user = interaction.options.getUser('user')
        const announcement = interaction.guild.channels.cache.get('937862332938321980')

        announcement.threads.create({
                name: 'Events',
                autoArchiveDuration: 1440,
                reason: `To organize the annoucements channel`
            })


	},
};