module.exports = {
	name: 'clear_guests',
	description: 'Removes all current collaborators',
    alias: 'cg',
    expectedArgs: null,
	reqPerms: ['moderator'],
	execute(message) {
        
        if(	message.channel.id != 950784217950863480 && message.channel.id != 937866303803392040 && message.channel.id != 937887865420005436 ) return;

        const Collabrole = message.guild.roles.cache.get(message.guild.roles.cache.find(role => role.name === 'Stream Guests').id);

       
        Collabrole.members.forEach((member, i) => { // Looping through the members of Role.
            setTimeout(() => {
                member.roles.remove(Collabrole); // Removing the Role.
            }, 1000);
        });
        

        
	}
};