module.exports = {
	name: 'event',
	description: 'Opens or Closes the event channel',
	alias: 'event',
	expectedArgs: 'none',
	reqPerms: ['moderator'],
	execute(message, args) {
		
		if(	message.channel.id != 950784217950863480 && message.channel.id != 937866303803392040 && message.channel.id != 937887865420005436 && message.channel.id != 937829490556547176 && message.channel.id != 956359784376963172 && message.channel.id != 956358085146992682) return;
		
		

        if(args[0] === 'open'){

            message.guild.channels.cache.get('MEMBER_ROLE').permissionOverwrites.edit("MEMBER_ROLE", { VIEW_CHANNEL: true });
            message.reply('The event channel is now open for all Members.')


        } else if (args[0] === 'close'){

            message.guild.channels.cache.get('MEMBER_ROLE').permissionOverwrites.edit("MEMBER_ROLE", { VIEW_CHANNEL: false });
            message.reply('The event channel is now closed to Members')


        }
        
			
		
	},
};