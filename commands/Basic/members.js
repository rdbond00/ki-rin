
module.exports = {
	name: 'members',
	description: 'Show list of server members',
	alias: 'mem',
	expectedArgs: null,
	reqPerms: ['moderator'],
 async execute(message, args, Client, MessageEmbed) {

	if(	message.channel.id != 950784217950863480 && message.channel.id != 937866303803392040 && message.channel.id != 937887865420005436 ) return;
	
		const guild = message.guild
        const channel = message.channel
        var msg = ""
        var options = { month: 'long'}

        await guild.members
            .fetch()
            .then((members) =>
                members.forEach((member) => msg += `${member.user.username} \n Joined:${new Intl.DateTimeFormat('en-us', options).format(new Date(member.joinedTimestamp).getMonth())} ${new Date(member.joinedTimestamp).getFullYear()} \n \n`)
                
            );

            const Embed = new MessageEmbed()
			.setColor('#00e600')
			.setAuthor('Current Members:')
			.setDescription(msg)
			.setTimestamp()

		channel.send({ embeds: [Embed] })
			
		
	},
};