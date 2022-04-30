const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('Mutes a user and prevents them from talking in text/voice'),
	async execute(interaction) {
		const member = interaction.options.getMember('user')
		var reason = interaction.options.getString('reason')
        const timevalue = interaction.options.getNumber('mute_time')
		
	// Most of this command is identical to kick, except that here we'll only let admins do it.
		// In the real world mods could mute too, but this is just an example, right? ;)
		
		if(!reason) reason = "No reason provided";
		if(member.user.bot === true)return;
		if(member._roles.includes("937858030874271856")||member._roles.includes("938171084807737344")||member._roles.includes("937891473448394824")){
			interaction.reply({ content: `I cannot mute that person, are they a mod or admin?`, ephemeral: true })
		}else {

		let mute_role = member.guild.roles.cache.find(role => role.name === 'Muted');
			member.roles.add(mute_role); // <- this assign the role
					const channel = member.guild.channels.cache.get(logChannelIDs.moderationlog)
					const Embed = new MessageEmbed()
						.setColor('#00e600')
						.setAuthor('User Muted', `${member.user.displayAvatarURL()}`)
						.setDescription(`**<@${member.user.id}> has been muted for ${timevalue} minutes by <@${interaction.user.id}>** \n \n **Reason:** \n ${reason}`)
						.setTimestamp()
						.setFooter(`ID: ${member.id}`);
				setTimeout(() => {member.roles.remove(mute_role);}, timevalue * 60000); // <- sets a timeout to unmute the user.
			channel.send({ embeds: [Embed] })

            interaction.reply({ content: `<@${member.id}> has been muted for ${timevalue} minutes for the reason: ${reason}`, ephemeral: true })
		}
	},
};