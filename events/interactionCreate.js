module.exports = {event: 'interactionCreate'}
module.exports.function = interactionhandler = async (interaction) => {
    //Slash commands handler
    client.handlers.get('slashcommand')(interaction)
    //Button handler
    client.handlers.get('button')(interaction)
    //SelectMenu Handler
    //client.handlers.get('selectmenu')(interaction)
    

}
