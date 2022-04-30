const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('message')
		.setDescription('Sends communication to user'),
	async execute(interaction) {
		const user = interaction.options.getUser('user').id
		const author = interaction.options.getUser('user')
		const message = interaction.options.getString('message')
		const RichEmbed = new MessageEmbed()
		.setColor('#00e600')
		.setAuthor(`${author.tag}`, `${author.displayAvatarURL()}`)
		.setDescription(`**ModMail received** \n ${message}`)
		.setTimestamp()
		.setFooter(`ID: ${author.id}`);

		await client.users.cache.get(user).send({ embeds: [RichEmbed] })
		.catch(error => interaction.reply({ content: `It appears that the user's DM's are closed.`, ephemeral: true}));

        interaction.reply({ content: `Your message: ${message} was sent to: <@${user}>`, ephemeral: true })
	},
};