// Called every time a error comes in
function errorhandler () {
    const date = new Date();

    client.on('error', console.error);

    const timestamp = (date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())

    process.on('unhandledRejection', error => {
        client.guilds.cache.get(config.guildId).channels.cache.get(logChannelIDs.errorlog).send(`${timestamp}: ${error.message}`)
    });

    process.on('uncaughtException', error => {
        client.guilds.cache.get(config.guildId).channels.cache.get(logChannelIDs.errorlog).send(`${timestamp}: ${error.message}`)
    });
    
    process.on('AudioPlayerError', error => {
        client.guilds.cache.get(config.guildId).channels.cache.get(logChannelIDs.errorlog).send(`${timestamp}: ${error.message}`)
    });

}
  module.exports = errorhandler