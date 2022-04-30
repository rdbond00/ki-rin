module.exports = {
	name: 'purge',
	description: 'purge',
	expectedArgs: '(number)',
	reqPerms: ['moderator'],
	async execute(message, args) {
		// This command removes all messages from all users in the channel, up to 99.
		if(!message.member.permissions.has('Ban Members') )return message.reply("Sorry, you don't have permissions to use this!");

		// get the delete count, as an actual number.
		const deleteCount = parseInt(args[0], 10);
    
		// Ooooh nice, combined conditions. <3
		if(!deleteCount || deleteCount < 1 || deleteCount > 99)
			return message.reply("Please provide a number between 2 and 99 for the number of messages to delete");
    
		// So we get our messages, and delete them. Simple enough, right?
		const fetched = await message.channel.messages.fetch({limit: deleteCount+1});
			message.channel.bulkDelete(fetched)
			.catch(error => message.reply(`Couldn't delete messages because of: ${error}`));	
	},
};