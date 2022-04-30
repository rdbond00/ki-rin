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

				reactRoles.forEach((emoji, index) => {

					
					const emojiName = Object.entries(emoji)[0][0]
					const roleId = Object.entries(emoji)[0][1]

					//Checks if the emoji use matches the expected emoji
					if(emojiDic.getName(reaction.emoji.name) === emojiName || reaction.emoji.name === emojiName) {

					//Grabs user who reacted 
				reaction.message.guild.members.fetch(user.id).then(result => {

					if(emojiDic.getName(reaction.emoji.name) === "x" || reaction.emoji.name === "x"){
						result.roles.add(roleId).catch(console.error);
					}
					else {
					result.roles.remove(roleId).catch(console.error);
					}
					}).catch(err => {})

					}


				})

			}
		}



 
      })
    
};

