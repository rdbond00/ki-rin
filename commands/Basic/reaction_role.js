module.exports = {
	name: 'reactionrole',
	description: 'Reaction role management',
	alias: 'rr',
	expectedArgs: '(subcommand) (<channelId>-<messageId>) (emojiName) (roleId)',
	reqPerms: ['moderator'],
	async execute(message, args) {
		
		if(	message.channel.id != 950784217950863480 && message.channel.id != 937866303803392040 && message.channel.id != 937887865420005436 ) return;

		const reactroles = require("../../Models/reactroles")
		const subcommand = args[0]


		
		if(subcommand === "add"){
			
			const textId = args[1]
			const text = args[1].split('-')
			const channelId = text[0]
			const messageId = text[1]
			const emojiName = args[2]
			const roleId = args[3]
			const emojis = args.slice(args.lastIndexOf(emojiName))

			reactroles.findOne({ guildId: message.guildId, messageId: messageId, channelId: channelId}, async (err, data) => {
				if(data) {
					data.reactRoles.push({[emojiName]:roleId})
				}
				if(err) throw err;
				if(!data) {

					data = new reactroles({
						guildId: message.guildId,
						messageId: messageId,
						channelId: channelId,
						reactRoles: [{[emojiName]:roleId}]
					})
					
				}
				data.save()
			});

		}
		
		if(subcommand === "addmany"){
			
			const textId = args[1]
			const text = args[1].split('-')
			const channelId = text[0]
			const messageId = text[1]
			const emojiName = args[2]
			const roleId = args[3]
			const emojis = args.slice(args.lastIndexOf(emojiName))

			reactroles.findOne({ guildId: message.guildId, messageId: messageId, channelId: channelId}, async (err, data) => {

				var emojiArray = []
				var completeemoji = ''

				emojis.forEach((emoji, index) => {
					if(index === 0 && index % 2 === 0){
						completeemoji = `{ "${emoji}":`
					}
					else if(index % 2 === 1){
						completeemoji += `"${emoji}" }`
						emojiArray.push(JSON.parse(completeemoji))
					} else if(index % 2 === 0){
						completeemoji = `{ "${emoji}":`
					}
					
				})

				if(err) throw err;
				if(!data) {
					
				//Need to re-format the incoming emoji pairs and combine them so that they can be used in the db


					data = new reactroles({
						guildId: message.guildId,
						messageId: messageId,
						channelId: channelId,
						reactRoles: emojiArray
					})
					
				} else {
					data.reactRoles = emojiArray
				}
				data.save()
			});

		}

		if(subcommand === "clear"){

            const text = args[1].split('-')
            const channelId = text[0]
            const messageId = text[1]

            if(messageId !== undefined){
                await reactroles.deleteOne({ guildId: message.guildId, messageId: messageId, channelId: channelId})
            } else {
                await reactroles.deleteMany({ guildId: message.guildId})
            }
        }

		if(subcommand === "list"||subcommand === "show"){

			reactroles.find({guildId: config.guildId},async (err, setuproles) => {

				setuproles.forEach((reactrole,index) => {
					Embed = new MessageEmbed()
					.setTitle('Self-assignable Role Settings')
					.setDescription(`[Link to message](https://discord.com/channels/${config.guildId}/${reactrole.channelId}/${reactrole.messageId})`)
					var emojilist = ""
					var rolelist = ""

					Embed.addField('MessageId',reactrole.messageId,true)
					Embed.addField('Channel',`<#${reactrole.channelId}>`,true)
					Embed.addField('\u200b','\u200b',false)

					reactrole.reactRoles.forEach((emoji, index) => {
						const emojiName = Object.entries(emoji)[0][0]
						const customEmoji = message.guild.emojis.cache.find(emoji => emoji.name === emojiName)
						
						if(customEmoji === undefined){
							emojilist += `:${Object.entries(emoji)[0][0]}:\n`
							rolelist += `<@&${Object.entries(emoji)[0][1]}>\n`
						}
						else if(customEmoji !== undefined){
							emojilist += `<:${Object.entries(emoji)[0][0]}:${customEmoji.id}>\n`
							rolelist += `<@&${Object.entries(emoji)[0][1]}>\n`
						}

					})
					Embed.addField('Emojis',emojilist,true)
					Embed.addField('Roles',rolelist,true)
				
					message.channel.send({ embeds: [Embed] }) 
				})
				
			 })   
		}

		if(subcommand === "embed"){

			const channelId = args[1].slice(2, -1)
			const emojiName = args[2]
			const roleId = args[3]
			const emojis = args.slice(args.lastIndexOf(emojiName))

			Embed = new MessageEmbed()
			.setTitle("Self-assignable roles")

			var completeemoji = ''

			emojis.forEach((emoji, index) => {
				if(index === 0 && index % 2 === 0){
					//1st run, index: 0
					completeemoji += `${emoji} `
				}
				else if(index % 2 === 1){
					//index: odd (i.e. 1)
					completeemoji += `${emoji}\n`
				} else if(index % 2 === 0){
					//index: even (i.e. 2)
					completeemoji += `${emoji} `
				}
				
			})

			Embed.setDescription(completeemoji)

			channel = message.guild.channels.cache.get(channelId)
			channel.send({ embeds: [Embed] })


		}

	},
};