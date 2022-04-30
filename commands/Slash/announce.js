const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('announce')
		.setDescription('Sends announcement to channel'),
	async execute(interaction) {
		const channel = interaction.options.getChannel(('channel')).id
		const message = interaction.options.getString('message')
		await client.channels.cache.get(channel).send(message);
        interaction.reply({ content: `Your message: "${message}" was sent to: <#${channel}>`, ephemeral: true })
	},
};