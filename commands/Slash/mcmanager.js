const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mcmanager')
		.setDescription('Does secret McManager stuff.'),
	async execute(interaction) {
        interaction.reply({ content: `Here you go sir o7\nhttps://clips.twitch.tv/CredulousHyperWatermelonPupper-hkvr24ssnyEKa4CW`})
	},
};