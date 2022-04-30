module.exports = {
	name: 'react',
	description: 'Reacts',
	alias: 'react',
	expectedArgs: '(channel, title, message)',
	reqPerms: ['moderator'],
	execute(message, args) {

        message.delete().then(() => {
        const { guild, channel } = message
		
        channel.messages.fetch({ limit: 1}).then(messages => {
            message = messages.first()

            if(!message) {
                channel.send('There are no mesages! ')
                return
            }
            message.react(args.toString())
        })
        })
        
	},

};