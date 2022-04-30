const reactrolesdb = require("../Models/reactroles")

global.reactmessages = {}

async function checkForReactRoles() {

reactrolesdb.find({guildId: config.guildId},async (err, reactroles) => {

   reactmessages = reactroles
   
   const reactmessageId = reactmessages.messageId
   const reactchannelId = reactmessages.channelId
   const reactRoles = reactmessages.reactRoles

          
})    

    setTimeout(checkForReactRoles, 1000 * 60)
    
}

module.exports.function = checkForReactRoles
