module.exports = {
	name: 'end_giveaway',
	description: 'Ends a giveaway',
    alias: 'e_ga',
    expectedArgs: null,
	reqPerms: ['moderator'],
	async execute(message) {
        message.delete().then(() => {
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
  
	}
};