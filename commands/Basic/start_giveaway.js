module.exports = {
	name: 'start_giveaway',
	description: 'Starts a giveaway',
    alias: 's_ga',
    expectedArgs: '(:emoji:)',
	reqPerms: ['moderator'],
	async execute(message, args) {
        message.delete().then(() => {
            const { guild, channel } = message
            const duration = args[0]
            channel.messages.fetch({ limit: 1}).then(messages => {
                message = messages.first()

                if(!message) {
                    channel.send('There are no mesages! ')
                    return
                }
                message.react(args.toString())

                    const { channel } = message

                    channel.messages.fetch({ limit: 1}).then( async (messages) => {
                        message = messages.first()
        
                        if(!message) {
                            channel.send('There are no mesages! ')
                            return
                        }
        
                        const { users } = await message.reactions.cache.first().fetch()
                        const reactionusers = await users.fetch()
        
                        const possibleWinners = Array.from(reactionusers.values()).filter((user) => {
                            return !user.bot
                        })
        
                        const winner = possibleWinners[Math.floor(Math.random() * possibleWinners.length)]
        
                        channel.send(`<@${winner.id}>, you are the winner of the giveaway. Congrats!`)
                    })


            })

        })

	}
};