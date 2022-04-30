const settingsdb = require("../Models/settings")

global.logChannelIDs = {}
global.RoleIDs = {}
global.RoleChannelIDs = {}
global.RoleMessageIDs = {}
global.bannedwords = new Array
global.savedSettings = {}
global.antispamSettings = {}

async function checkForSettings() {

settingsdb.find({guildId: config.guildId},async (err, settings) => {

    savedSettings = Object.assign(settings)[0]
    var channelMap = new Map()

    Object.entries(savedSettings.loggingChannels).forEach((channel, index) => {
        const channelname = channel[0]
        const channelID = channel[1].channelID
        const Enabled = channel[1].Enabled
        
        if(Enabled === true) {
          channelMap.set(channelname, channelID)
            }
       
      })
      
          logChannelIDs = Object.fromEntries(channelMap)
          bannedwords = (Object.entries(savedSettings)[2][1].bannedwords)
          antispamSettings = (Object.entries(savedSettings)[2][1].antispam)
          
})    

    setTimeout(checkForSettings, 1000 * 60)
    
}

module.exports.function = checkForSettings
