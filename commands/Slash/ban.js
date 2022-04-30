const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans user from the server'),
	async execute(interaction) {
		const member = interaction.options.getMember('user')
		const days	 = interaction.options.getInteger('days')
		const reason = interaction.options.getString('reason')
		
        if(!member)
		return interaction.reply({ content: "Please mention a valid member of this server", ephemeral: true});
		if(!member.bannable) 
		return interaction.reply({ content: "I cannot ban this user! Do they have a higher role? Do I have ban permissions?", ephemeral: true});

        await member.ban({days: days, reason: reason})
		.catch(error => interaction.reply({ content: `Sorry I couldn't ban because of : ${error}`, ephemeral: true}));
		
		interaction.reply({ content: `<@${user.id}> has been banned for the reason: ${reason}`, ephemeral: true })
				const channel = member.guild.channels.cache.get(logChannelIDs.moderationlog)
				const Embed = new MessageEmbed()
					.setColor('#00e600')
					.setAuthor('User Banned', `${member.user.displayAvatarURL()}`)
					.setDescription(`**${member.user.username}#${member.user.discriminator} has been banned from the server** \n \n **Reason:** \n ${reason}`)
					.setTimestamp()
					.setFooter(`ID: ${member.id}`);
		channel.send({ embeds: [Embed] })
	},
};