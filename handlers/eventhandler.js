
function eventhandler () {

    const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
    
    for (const file of eventFiles) {
        const eventFile = require(`../events/${file}`);

        if(eventFile.type === 'music') {
            music.event.on(eventFile.event,eventFile.function)
        } else {
            client.on(eventFile.event,eventFile.function)
        }
    }

}   
  module.exports = eventhandler