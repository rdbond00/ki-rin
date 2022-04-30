module.exports = {event: 'guildMemberAdd'}
	module.exports.function = memberjoined = (member) => {
            const channel = member.guild.channels.cache.get(logChannelIDs.actionlog)
            const alertchannel = member.guild.channels.cache.get("937866303803392040")

            if(member.user.username === "DrewJocker") {alertchannel.send({content: `<@937858030874271856>'s, a user with the username: ${member.user.username} has joined the server. Be advised.` })}
            
            const Embed = new MessageEmbed()
                .setColor('#00e600')
                .setAuthor({name:'Member Joined', iconURL:`${member.user.displayAvatarURL()}`})
                .setThumbnail(`${member.user.displayAvatarURL()}`)
                .setDescription(`<@${member.id}> ${member.user.tag} `)
                .setTimestamp()
                .setFooter(`ID: ${member.id}`);
    
            channel.send({ embeds: [Embed] })




    }

		
		
			
		

