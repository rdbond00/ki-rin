module.exports = {event: 'voiceStateUpdate'}
    module.exports.function = voicestatus = (oldMember, newMember) => {
            // Voice Join/Leave/Switch
            
                if (oldMember.channelId === null && newMember.channelId !== null) {
                    
                    const channel = newMember.guild.channels.cache.get(logChannelIDs.actionlog)
                    const Embed = new MessageEmbed()
                        .setColor('#00e600')
                        .setAuthor(`${newMember.guild.members.cache.get(newMember.id).user.username}#${newMember.guild.members.cache.get(newMember.id).user.discriminator}`, `${newMember.guild.members.cache.get(newMember.id).user.displayAvatarURL()}`)
                        .setDescription(`<@${newMember.id}> **joined voice channel** <#${newMember.channelId}>`)
                        .setTimestamp()
                        .setFooter(`ID: ${newMember.id}`);
                    channel.send({ embeds: [Embed] })
                }
            
                if (newMember.channelId === null && oldMember.channelId !== null) {
                    const channel = newMember.guild.channels.cache.get(logChannelIDs.actionlog)
                        const Embed = new MessageEmbed()
                            .setColor('#ff6600')
                            .setAuthor(`${newMember.guild.members.cache.get(newMember.id).user.username}#${newMember.guild.members.cache.get(newMember.id).user.discriminator}`, `${newMember.guild.members.cache.get(newMember.id).user.displayAvatarURL()}`)
                            .setDescription(`<@${newMember.id}> **left voice channel** <#${oldMember.channelId}>`)
                            .setTimestamp()
                            .setFooter(`ID: ${newMember.id}`);
                        channel.send({ embeds: [Embed] })
                }
            
                if (newMember.channelId !== null && oldMember.channelId !== null) {
                    const channel = newMember.guild.channels.cache.get(logChannelIDs.actionlog)
            
                    //Check if currently deafened (by-self)
                    if(oldMember.selfDeaf === false && newMember.selfDeaf === true) {
                        const Embed = new MessageEmbed()
                            .setColor('#ff6600')
                            .setAuthor(`${newMember.guild.members.cache.get(newMember.id).user.username}#${newMember.guild.members.cache.get(newMember.id).user.discriminator}`, `${newMember.guild.members.cache.get(newMember.id).user.displayAvatarURL()}`)
                            .setDescription(`<@${newMember.id}> **deafened in** <#${oldMember.channelId}>`)
                            .setTimestamp()
                            .setFooter(`ID: ${newMember.id}`);
                        channel.send({ embeds: [Embed] })
                        return
                    }
                    //Check if *was* deafened (by-self)
                    if(oldMember.selfDeaf === true && newMember.selfDeaf === false) {
                        const Embed = new MessageEmbed()
                            .setColor('#ff6600')
                            .setAuthor(`${newMember.guild.members.cache.get(newMember.id).user.username}#${newMember.guild.members.cache.get(newMember.id).user.discriminator}`, `${newMember.guild.members.cache.get(newMember.id).user.displayAvatarURL()}`)
                            .setDescription(`<@${newMember.id}> **undeafened in** <#${oldMember.channelId}>`)
                            .setTimestamp()
                            .setFooter(`ID: ${newMember.id}`);
                        channel.send({ embeds: [Embed] })
                        return
                    }
            
                    //Check if currently muted (by-self)
                    if(oldMember.selfMute === false && newMember.selfMute === true) {
                        const Embed = new MessageEmbed()
                            .setColor('#ff6600')
                            .setAuthor(`${newMember.guild.members.cache.get(newMember.id).user.username}#${newMember.guild.members.cache.get(newMember.id).user.discriminator}`, `${newMember.guild.members.cache.get(newMember.id).user.displayAvatarURL()}`)
                            .setDescription(`<@${newMember.id}> **muted in** <#${oldMember.channelId}>`)
                            .setTimestamp()
                            .setFooter(`ID: ${newMember.id}`);
                        channel.send({ embeds: [Embed] })
                        return
                    }
            
                    //Check if *was* muted (by-self)
                    if(oldMember.selfMute === true && newMember.selfMute === false) {
                        const Embed = new MessageEmbed()
                            .setColor('#ff6600')
                            .setAuthor(`${newMember.guild.members.cache.get(newMember.id).user.username}#${newMember.guild.members.cache.get(newMember.id).user.discriminator}`, `${newMember.guild.members.cache.get(newMember.id).user.displayAvatarURL()}`)
                            .setDescription(`<@${newMember.id}> **unmuted in** <#${oldMember.channelId}>`)
                            .setTimestamp()
                            .setFooter(`ID: ${newMember.id}`);
                        channel.send({ embeds: [Embed] })
                        return
                    }		
            
                    //Check if currently deafened (by-server)
                    if(oldMember.serverDeaf === false && newMember.serverDeaf === true) {
                        const Embed = new MessageEmbed()
                            .setColor('#ff6600')
                            .setAuthor(`${newMember.guild.members.cache.get(newMember.id).user.username}#${newMember.guild.members.cache.get(newMember.id).user.discriminator}`, `${newMember.guild.members.cache.get(newMember.id).user.displayAvatarURL()}`)
                            .setDescription(`<@${newMember.id}> **server-deafened in** <#${oldMember.channelId}>`)
                            .setTimestamp()
                            .setFooter(`ID: ${newMember.id}`);
                        channel.send({ embeds: [Embed] })
                        return
                    }
            
                    //Check if *was* deafened (by-server)
                    if(oldMember.serverDeaf === true && newMember.serverDeaf === false) {
                        const Embed = new MessageEmbed()
                            .setColor('#ff6600')
                            .setAuthor(`${newMember.guild.members.cache.get(newMember.id).user.username}#${newMember.guild.members.cache.get(newMember.id).user.discriminator}`, `${newMember.guild.members.cache.get(newMember.id).user.displayAvatarURL()}`)
                            .setDescription(`<@${newMember.id}> **server-undeafened in** <#${oldMember.channelId}>`)
                            .setTimestamp()
                            .setFooter(`ID: ${newMember.id}`);
                        channel.send({ embeds: [Embed] })
                        return
                    }
            
                    //Check if currently muted (by-server)
                    if(oldMember.serverMute === false && newMember.serverMute === true) {
                        const Embed = new MessageEmbed()
                            .setColor('#ff6600')
                            .setAuthor(`${newMember.guild.members.cache.get(newMember.id).user.username}#${newMember.guild.members.cache.get(newMember.id).user.discriminator}`, `${newMember.guild.members.cache.get(newMember.id).user.displayAvatarURL()}`)
                            .setDescription(`<@${newMember.id}> **server-muted in** <#${oldMember.channelId}>`)
                            .setTimestamp()
                            .setFooter(`ID: ${newMember.id}`);
                        channel.send({ embeds: [Embed] })
                        return
                    }
            
                    //Check if *was* muted (by-server)
                    if(oldMember.serverMute === true && newMember.serverMute === false) {
                        const Embed = new MessageEmbed()
                            .setColor('#ff6600')
                            .setAuthor(`${newMember.guild.members.cache.get(newMember.id).user.username}#${newMember.guild.members.cache.get(newMember.id).user.discriminator}`, `${newMember.guild.members.cache.get(newMember.id).user.displayAvatarURL()}`)
                            .setDescription(`<@${newMember.id}> **server-unmuted in** <#${oldMember.channelId}>`)
                            .setTimestamp()
                            .setFooter(`ID: ${newMember.id}`);
                        channel.send({ embeds: [Embed] })
                        return
                    }
                        const Embed = new MessageEmbed()
                            .setColor('#ff6600')
                            .setAuthor(`${newMember.guild.members.cache.get(newMember.id).user.username}#${newMember.guild.members.cache.get(newMember.id).user.discriminator}`, `${newMember.guild.members.cache.get(newMember.id).user.displayAvatarURL()}`)
                            .setDescription(`<@${newMember.id}> **moved voice channels** <#${newMember.channelId}>`)
                            .setTimestamp()
                            .setFooter(`ID: ${newMember.id}`);
                        channel.send({ embeds: [Embed] })
                }
            
            }

		
		
			
		

