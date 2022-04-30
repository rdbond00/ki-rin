module.exports = {
	name: 'announce',
	description: 'Announces to another channel your message',
	alias: 'a',
	expectedArgs: '(channel, message)',
	reqPerms: ['moderator'],
	execute(message, args) {
		
		if(	message.channel.id != 950784217950863480 && message.channel.id != 937866303803392040 && message.channel.id != 937887865420005436 ) return;
		
		channel = message.guild.channels.cache.get(args[0].slice(2, -1))
		
			mymessage =args.splice(1).join(" ")
			
			channel.send(mymessage)
			
		
	},
};