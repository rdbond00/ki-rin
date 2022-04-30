module.exports = {
    name: 'message',
    description: 'Sends message to specified user',
    alias: 'm',
    expectedArgs: '(user, message)',
	reqPerms: ['moderator'],
    async execute(message, args) {

        if(	message.channel.id != 950784217950863480 && message.channel.id != 937866303803392040 && message.channel.id != 937887865420005436 ) return;

        user = message.guild.members.cache.get(args[0].slice(2, -1))

            mymessage =args.splice(1).join(" ")

            await message.mentions.members.first().send(mymessage)
            .catch(message.send({ content: `It appears that the user's DM's are closed.`}));
    }
}
