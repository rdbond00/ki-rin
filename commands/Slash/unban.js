const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unbans user from the server'),
	async execute(interaction, client) {
		const user = interaction.options.getUser('user')
		const reason = interaction.options.getString('reason')
		const guild = interaction.guild

		await guild.members.unban(user, {reason: reason})
			.catch(error => interaction.reply({ content: `Sorry I couldn't unban because of : ${error}`, ephemeral: true}));

			interaction.reply({ content: `<@${user.id}> has been unbanned for the reason: ${reason}`, ephemeral: true })
	},
};