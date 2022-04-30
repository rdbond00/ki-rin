/* Use bannedwords to set banned words to be removed upon mention in any message
*/

/* The next part will scan messages for any of the banned words set above and remove messages containing them
*/

function badwords (message) {
    if (message.author.bot) return;
    
    for (x = 0; x < bannedwords.length; x++) {
        var regex = new RegExp("^"+bannedwords[x]+"$")
        
		if (message.content.toLowerCase().match(regex)){   

            message.delete()
            const channel = message.guild.channels.cache.get(logChannelIDs.moderationlog)
            const Embed = new MessageEmbed()
                .setColor('#ee0b0b')
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setDescription(`**Banned word used by** <@${message.author.id}> **deleted in** <#${message.channel.id}> \n ${message.content}`)
                .setTimestamp()
                .setFooter(`ID: ${message.author.id}`);

                channel.send({content:'<@&937858030874271856>', embeds: [Embed] })
            return;  

        }
    }
}
module.exports = badwords
