module.exports = {
	name: 'embed',
	description: 'Sends an embed message to another channel',
	alias: 'embed',
	expectedArgs: '(channel, title, message)',
	reqPerms: ['moderator'],
	execute(message, args) {
		
		channel = message.guild.channels.cache.get(args[0].slice(2, -1))
		
			mymessage =args.splice(1).join(" ")
			
            Embed = new MessageEmbed()

            Embed.setDescription(mymessage)

            message.delete()
			channel.send({embeds: [Embed]})
			
		
	},
};