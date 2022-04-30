const emojiDic = require('emoji-dictionary')


//Message ID's
//Brought in via global RoleMessageIDs Object from Database

//Channel ID's
//Brought in via global RoleChannelIDs Object from Database

//Role ID's
//Brought in via global RoleIDs Object from database


module.exports.ReactRoles = (reaction, user) => {
	
	reactmessages.forEach((reactmessage, index) => {
        
		const reactmessageId = reactmessage.messageId
		const reactchannelId = reactmessage.channelId
		const reactRoles = reactmessage.reactRoles
		
		if(reaction.message.channelId === reactchannelId) {
		// Checks if the reaction is to an expected message
			if(reaction.message.id === reactmessageId) {
			
					if(client.user.id === user.id)return;
					
				reactRoles.forEach((emoji, index) => {
					
					const emojiName = Object.entries(emoji)[0][0]
					const roleId = Object.entries(emoji)[0][1]
					
					//Checks if the emoji use matches the expected emoji
					if(emojiDic.getName(reaction.emoji.name) === emojiName || reaction.emoji.name === emojiName) {
					
					//Grabs user who reacted 
				reaction.message.guild.members.fetch(user.id).then(result => {
					if(emojiDic.getName(reaction.emoji.name) === "x" || reaction.emoji.name === "x"){
						result.roles.remove(roleId).catch(console.error);
					}
					else {
					result.roles.add(roleId).catch(console.error);
					}
					}).catch(err => {})

					}


				})
				var emojilist = []
				reactRoles.forEach((emoji, index) => {
					
					const emojiName = Object.entries(emoji)[0][0]
					emojilist.push(emojiName)

				})

				
				if(emojilist.includes(emojiDic.getName(reaction.emoji.name)) || emojilist.includes(reaction.emoji.name)){
					//Do Nothing if found
				}
				else {
					if(reaction.message.id === "RULES_MESSAGE"){
						if(emojiDic.getName(reaction.emoji.name) === "imp" || reaction.emoji.name === "imp")return;
						if(emojiDic.getName(reaction.emoji.name) === "white_check_mark" || reaction.emoji.name === "white_check_mark")return;
						if(emojiDic.getName(reaction.emoji.name) === "smiling_imp" || reaction.emoji.name === "smiling_imp"){
							reaction.message.guild.members.fetch(user.id).then(member => {

								if(!member.roles.cache.has('MEMBER_ROLE')){
									member.kick("User did not read the rules and reacted with the wrong emoji.")
								}

							})
						} else {
							reaction.remove()
						}

						
						


					}
					else{
						reaction.remove()
					}
					
				}

			}
		}



 
      })
    
};
