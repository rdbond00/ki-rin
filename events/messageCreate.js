module.exports = {event: 'messageCreate'}
module.exports.function = messagehandler = (message) => {

    //Anti-spam setup
    const AntiSpam = require("discord-anti-spam");
    const antiSpam = new AntiSpam(antispamSettings)

    //Basic commands handler
    client.handlers.get('basiccommand')(message)

    //Anti-spam handler
    antiSpam.message(message)

    //Banned words filter
    client.functions.get('bannedwords')(message)

    //Auto-mod
    client.functions.get('automod')(message)

    //dm
    client.functions.get('dm')(message)
    
}