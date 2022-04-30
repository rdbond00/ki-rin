module.exports = {
	name: 'add_guests',
	description: 'Adds specified users to role for collab channel',
	alias: 'ag',
	expectedArgs: '(user)',
	reqPerms: ['moderator'],
	execute(message) {
		
		if(	message.channel.id != 950784217950863480 && message.channel.id != 937866303803392040 && message.channel.id != 937887865420005436 ) return;
		
			message.mentions.users.each(user => message.guild.members.cache.get(user.id).roles.add(message.guild.roles.cache.get(message.guild.roles.cache.find(role => role.name === 'Stream Guests').id)))
		
	}
};