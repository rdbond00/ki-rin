const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicks user from the server'),
	async execute(interaction) {
		const member = interaction.options.getMember('user')
		const reason = interaction.options.getString('reason')
		
        if(!member)
		return interaction.reply({ content: "Please mention a valid member of this server", ephemeral: true});
		if(!member.kickable) 
		return interaction.reply({ content: "I cannot kick this user! Do they have a higher role? Do I have kick permissions?", ephemeral: true});

        await member.kick(reason)
		.catch(error => interaction.reply({ content: `Sorry I couldn't kick because of : ${error}`, ephemeral: true}));

		interaction.reply({ content: `<@${member.id}> has been kicked for the reason: ${reason}`, ephemeral: true })
				const channel = member.guild.channels.cache.get(logChannelIDs.moderationlog)
				const Embed = new MessageEmbed()
					.setColor('#00e600')
					.setAuthor('User Kicked', `${member.user.displayAvatarURL()}`)
					.setDescription(`**${member.user.username}#${member.user.discriminator} has been kicked from the server** \n \n **Reason:** \n ${reason}`)
					.setTimestamp()
					.setFooter(`ID: ${member.id}`);
		channel.send({ embeds: [Embed] })
	},
};