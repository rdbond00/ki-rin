const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reboot')
		.setDescription('Forces the bot to reboot'),
	async execute(interaction) {

        await interaction.reply({ content: `Reboot initiated.`, ephemeral: true })
        process.exit()
	},
};