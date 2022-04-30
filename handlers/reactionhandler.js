
function reactionhandler () {

    const messageFiles = fs.readdirSync('./events/message').filter(file => file.endsWith('.js'));
    
    for (const file of messageFiles) {
        const messageReaction = require(`../events/message/${file}`);
        client.on(messageReaction.event,messageReaction.function)
    }

}   
  module.exports = reactionhandler